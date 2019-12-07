<?php

namespace App\Command;


use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Helper\QuestionHelper;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class AdminCreateCommand extends Command
{
    
    const ADMIN = [
        'email' => 'admin@com.pl',
        'password' => 'admin123',
    ];
    private $userRepository;
    private $manager;
    private $validator;
    private $passwordEncoder;
    
    protected static $defaultName = 'app:admin:create';
    
    public function __construct(
        UserRepository $userRepository,
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManagerInterface $manager,
        ValidatorInterface $validator
    ) {
        $this->userRepository = $userRepository;
        
        parent::__construct();
        $this->passwordEncoder = $passwordEncoder;
        $this->manager = $manager;
        $this->validator = $validator;
    }
    
    protected function configure()
    {
        $this
            ->setDescription('Creates an admin user')
            ->setHelp(' This command allows you to create an admin user');;
    }
    
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $io->title('   Admin Creator   ');
        
        $this->interact($input, $output);
        
        /** @var QuestionHelper $helper */
        $helper = $this->getHelper('question');
        $emailQuestion = new Question("E-mail: ");
        $emailQuestion->setValidator(function ($answer) {
            if ($answer == null) {
                throw new \RuntimeException('✗ Email cannot be empty');
            }
            $emailConstraint = new Assert\Email();
            $emailConstraint->message = '✗ Invalid email ';
            $errorsCon = $this->validator->validate($answer, $emailConstraint);
            if (count($errorsCon) > 0) {
                throw new \RuntimeException($errorsCon[0]->getMessage());
            }
            $count = $this->userRepository->findAll();
            $exists = $this->userRepository->findOneBy(['email' => $answer]);
            if ($exists) {
                throw new \RuntimeException('✗ This admin already exists. all(' . count((array)$exists) . ')');
            }
            
            return $answer;
        });
        $emailQuestion->setMaxAttempts(3);
        $email = $helper->ask($input, $output, $emailQuestion);
        
        $passwordQuestion = new Question("Password: ");
        $passwordQuestion->setValidator(function ($answer) {
            if ($answer == null) {
                throw new \RuntimeException('✗ Password cannot be empty');
            }
            
            return $answer;
        });
        $passwordQuestion->setMaxAttempts(2);
        
        $passwordQuestion->setHidden(true);
        $passwordQuestion->setHiddenFallback(false);
        $password = $helper->ask($input, $output, $passwordQuestion);
        
        $firstnameQuestion = new Question("First name: ");
        $firstnameQuestion->setValidator(function ($answer) {
            if ($answer == null) {
                throw new \RuntimeException('✗ First Name cannot be empty');
            }
            
            return $answer;
        });
        $firstnameQuestion->setMaxAttempts(2);
        $firstName = $helper->ask($input, $output, $firstnameQuestion);
        
        $lastnameQuestion = new Question("Last name: ");
        $lastnameQuestion->setValidator(function ($answer) {
            if ($answer == null) {
                throw new \RuntimeException('✗ Last Name cannot be empty');
            }
            
            return $answer;
        });
        $lastnameQuestion->setMaxAttempts(2);
        $lastName = $helper->ask($input, $output, $lastnameQuestion);
        
        //doctrine
        $admin = new User();
        $admin->setEmail($email);
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->passwordEncoder->encodePassword($admin, $password));
        $admin->setFirstName($firstName);
        $admin->setLastName($lastName);
        
        $this->manager->persist($admin);
        $this->manager->flush();
        
        $data = [
            'email' => $email,
            'password' => '{your password}',
            'first_name' => $firstName,
            'last_name' => $lastName,
        ];
        
        $rows = [];
        foreach ($data as $key => $val) {
            $rows[] = [$key, $val];
        }
        $io->write('<fg=black;bg=green;options=bold>');
        $io->newLine(2);
        $io->write(' ✓ You have created a new admin user');
        $io->write(' </>', 1);
        $io->table(['Key', 'Value'], $rows);
        
        return 200;
    }
}
