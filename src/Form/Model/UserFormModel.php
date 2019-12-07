<?php
/**
 * UserFormModel.php - powered by PhpStorm
 *
 * Idea & Mind of Anatol Derbisz
 * Copyright(c) 2019 by Anatholius Programowanie <biuro@anatholius.pro>
 * Made with passion in Wrocław
 *
 * On: 25-02-2019 14:21:22
 */

namespace App\Form\Model;


use App\Entity\User;
use App\Validator\UniqueUser;
use Faker\Factory;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @UniqueUser()
 */
class UserFormModel {
    
    public $id;
    /**
     * @Assert\NotBlank(message="Please enter an email")
     * @Assert\Email(message="It should be an email address")
     */
    public $email;
    /**
     * @Assert\NotBlank(message="Choose a password",groups={"Registration"})
     * @Assert\Length(min="5",minMessage="It should be longer than that")
     */
    public $plainPassword;
    /**
     * @Assert\NotBlank()
     */
    public $firstName;
    /**
     * @Assert\NotBlank()
     */
    public $lastName;
    /**
     * @Assert\NotBlank()
     */
    public $street;
    /**
     * @Assert\NotBlank()
     */
    public $postalCode;
    /**
     * @Assert\NotBlank()
     */
    public $city;
    
    /** @var CompanyFormModel */
    public $company;
    
    /** @var User */
    public $provider;
    /** @var User */
    public $employer;
    
    public $allowedServices;
    
    /**
     * @Assert\IsTrue(message="You have to agree terms!")
     */
    public $agreeTerms;
    
    public function getId() {
        return $this->id;
    }
    
    public function populate(User $user) {
        $this->id = $user->getId();
        $this->email = $user->getEmail();
        $this->firstName = $user->getFirstName();
        $this->lastName = $user->getLastName();
        $this->street = $user->getStreet();
        $this->postalCode = $user->getPostalCode();
        $this->city = $user->getCity();
        $this->company = $user->getCompany();
        $this->provider = $user->getProvider();
        $this->employer = $user->getEmployer();
        $this->allowedServices = $user->getAllowedServices();
    }
    
    public function setFakeData($type) {
        $faker = Factory::create('pl_PL');
        
        $this->email = $faker->email;
        $this->plainPassword = $faker->password(5);
        
        $this->firstName = $faker->firstName;
        $this->lastName = $faker->lastName;
        
        if ($type != 'admin') {
            $this->street = $faker->streetAddress;
            $this->postalCode = $faker->postcode;
            $this->city = $faker->city;
            
            $companyFormModel = new CompanyFormModel();
            $companyFormModel->setFakeData();
            
            $this->company = $companyFormModel;
        }
    
        $this->allowedServices = [];
        
    }
    
}