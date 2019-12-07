<?php

namespace App\Repository;


use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }
    
    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }
        
        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }
    
    /**
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getProvidersQuery()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.provider IS NULL')
            ->andWhere('u.employer IS NULL');
    }
    
    /**
     * @return User
     */
    public function getProviders()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.provider IS NULL')
            ->andWhere('u.employer IS NULL')
            ->getQuery()->execute();
    }
    
    /**
     * @return User
     */
    public function getEmployers()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.provider IS NOT NULL')
            ->getQuery()->execute();
    }
    
    /**
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getEmployersQuery()
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.provider IS NOT NULL')
            ->andWhere('u.employer IS NULL');
    }
    
    /**
     * @param string $query
     * @param int    $limit
     *
     * @return User[]
     */
    public function getMatchingProviders(string $query = '', int $limit = 5)
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.provider IS NULL')
            ->andWhere('u.employer IS NULL')
            ->andWhere('u.email LIKE :query')
            ->setParameter('query', "%$query%")
            ->setMaxResults($limit)
            ->getQuery()->execute();
    }
    
    /**
     * @param string $query
     * @param int    $limit
     *
     * @return User[]
     */
    public function getMatchingEmployers(string $query = '', int $limit = 5)
    {
        return $this->createQueryBuilder('u')
            ->orderBy('u.email', 'ASC')
            ->where('u.email LIKE :query')
            /**
             * require scienta/doctrine-json-functions package,
             * some config in doctrine orm key and correct semantic
             */
            ->where("JSON_CONTAINS(u.roles, :role) = 1")
            ->setParameter('query', '%' . $query . '%')
            ->setMaxResults($limit)
            ->getQuery()->execute([
                'role' => '"ROLE_CLIENT"',
            ]);
    }
    
    public function getClients($provider = null)
    {
        if ($provider == null) {
            return $this->addOnlyClientsQueryBuilder()
                ->orderBy('u.email', 'ASC')
                ->getQuery()->execute();
        } else {
            return $this->addClientsByProviderQueryBuilder($provider)
                ->orderBy('u.email', 'ASC')
                ->getQuery()->execute();
            
        }
    }
    
    public function getEmployees($employer = null)
    {
        if ($employer == null) {
            return $this->addOnlyEmployeesQueryBuilder()
                ->getQuery()->execute();
        } else {
            return $this->addEmployeesByClientQueryBuilder($employer)
                ->getQuery()->execute();
            
        }
    }
    
    private function addClientsByProviderQueryBuilder($provider, QueryBuilder $qb = null)
    {
        return $this->addOnlyClientsQueryBuilder($qb)
            ->andWhere('u.provider = :provider')
            ->setParameter('provider', $provider);
    }
    
    private function addEmployeesByClientQueryBuilder($employer)
    {
        return $this->addOnlyEmployeesQueryBuilder()
            ->andWhere('u.employer = :employer')
            ->setParameter('employer', $employer);
    }
    
    private function addOnlyEmployeesQueryBuilder(QueryBuilder $qb = null)
    {
        return $this->getOrCreateQueryBuilder($qb)
            ->andWhere('u.provider IS NULL')
            ->andWhere('u.employer IS NOT NULL')
            ->orderBy('u.employer', 'ASC');
    }
    
    private function addOnlyClientsQueryBuilder(QueryBuilder $qb = null)
    {
        return $this->getOrCreateQueryBuilder($qb)
            ->andWhere('u.provider IS NOT NULL')
            ->andWhere('u.employer IS NULL')
            ->orderBy('u.provider', 'ASC');
    }
    
    private function getOrCreateQueryBuilder(QueryBuilder $qb = null)
    {
        return $qb ?: $this->createQueryBuilder('u');
    }
}
