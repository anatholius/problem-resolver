<?php

namespace App\Entity;


use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Form\Model\UserFormModel;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\Encoder\EncoderAwareInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"user:read"}},
 *         "denormalization_context"={"groups"={"user:write"}},
 *     },
 *     collectionOperations={
 *          "get" = {
 *              "security"="is_granted('ROLE_EMPLOYER') and object == user",
 *          },
 *          "post" = {
 *              "security"="is_granted('ADD', object)",
 *              "validation_groups"={"Default","user:create"},
 *          },
 *     },
 *     itemOperations={
 *         "get",
 *         "put" = {
 *              "security"="is_granted('ROLE_EMPLOYEE') and object == user",
 *          },
 *         "delete" = {
 *              "security"="is_granted('ROLE_ADMIN')",
 *          },
 *         "api_users_clients_get_subresource"={
 *             "method"="GET",
 *             "path"="/users/clients/{id}",
 *             "normalization_context"={"groups"={"provider"}},
 *          },
 *         "api_users_clients_employees_get_subresource"={
 *             "method"="GET",
 *             "path"="/users/clients/employees/{id}",
 *             "normalization_context"={"groups"={"client"}},
 *          },
 *         "api_users_employees_get_subresource"={
 *             "method"="GET",
 *             "path"="/users/employees/{id}",
 *             "normalization_context"={"groups"={"employee"}},
 *          },
 *     },
 * )
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(
 *     fields={"email"},
 *     message="This email already exists"
 * )
 */
class User implements UserInterface, EncoderAwareInterface
{
    
    /**
     * @var int
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:write","provider"})
     */
    private $id;
    
    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank()
     * @Assert\Email(message="It should be an email address")
     * @Groups({"user:read", "user:write","provider","client","employee"})
     */
    private $email;
    
    /**
     * @ORM\Column(type="json")
     * @Groups({"admin:write"})
     */
    private $roles = [];
    
    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $password;
    /**
     * @Groups({"user:write", "provider", "client", "employee"})
     * @SerializedName("password")
     * @Assert\NotBlank(groups={"user:create"})
     */
    private $plainPassword;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"user:read", "user:write","provider","client","employee"})
     */
    private $firstName;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"user:read", "user:write","provider","client","employee"})
     */
    private $lastName;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read", "user:write","client","employee"})
     */
    private $street;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read", "user:write","client","employee"})
     */
    private $postalCode;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"admin:read", "user:write","client","employee"})
     */
    private $city;
    
    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $avatar;
    
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="employers", cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"client"})
     */
    private $provider;
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="provider", orphanRemoval=true)
     * @ORM\JoinColumn(nullable=true)
     * @ApiSubresource(maxDepth=1)
     * @Groups({"provider"})
     */
    private $employers = [];
    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="employees", cascade={"remove"})
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"employee"})
     */
    private $employer;
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="employer", orphanRemoval=true)
     * @ORM\JoinColumn(nullable=true)
     * @ApiSubresource(maxDepth=1)
     * @Groups({"client"})
     */
    private $employees = [];
    
    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"client","employee"})
     */
    private $agreedTermsAt;
    
    public function __construct()
    {
        $this->employers = new ArrayCollection();
        $this->employees = new ArrayCollection();
    }
    
    public function __toString(): string
    {
        return $this->getEmail();
    }
    
    public function getEncoderName()
    {
        if ($this->hasRole('ROLE_ADMIN')) {
            return 'admin';
        } else if ($this->hasRole('ROLE_EMPLOYEE')) {
            return 'employee';
        }
        
        return 'client';
    }
    
    public function getId(): int
    {
        return $this->id;
    }
    
    public function getEmail(): ?string
    {
        return $this->email;
    }
    
    public function setEmail(string $email): self
    {
        $this->email = $email;
        
        return $this;
    }
    
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }
    
    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        
        return array_unique($roles);
    }
    
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        
        return $this;
    }
    
    public function hasRole(string $role)
    {
        return in_array($role, $this->roles);
    }
    
    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string)$this->password;
    }
    
    public function setPassword(string $password): self
    {
        $this->password = $password;
        
        return $this;
    }
    
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }
    
    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;
        
        return $this;
    }
    
    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }
    
    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }
    
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }
    
    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;
        
        return $this;
    }
    
    public function getLastName(): ?string
    {
        return $this->lastName;
    }
    
    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;
        
        return $this;
    }
    
    public function getStreet(): ?string
    {
        return $this->street;
    }
    
    public function setStreet(?string $street): self
    {
        $this->street = $street;
        
        return $this;
    }
    
    public function getCity(): ?string
    {
        return $this->city;
    }
    
    public function setCity(?string $city): self
    {
        $this->city = $city;
        
        return $this;
    }
    
    /**
     * @return mixed
     */
    public function getAvatar()
    {
        return $this->avatar;
    }
    
    /**
     * @param mixed $avatar
     */
    public function setAvatar($avatar): void
    {
        $this->avatar = $avatar;
    }
    
    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }
    
    public function setPostalCode(?string $postalCode): self
    {
        $this->postalCode = $postalCode;
        
        return $this;
    }
    
    public function getProvider()
    {
        return $this->provider;
    }
    
    public function setProvider($provider): self
    {
        $this->provider = $provider;
        
        return $this;
    }
    
    public function getEmployer(): ?self
    {
        return $this->employer;
    }
    
    public function setEmployer(?self $employer): self
    {
        $this->employer = $employer;
        
        return $this;
    }
    
    /**
     * @return Collection|self[]
     */
    public function getEmployers(): Collection
    {
        return $this->employers;
    }
    
    public function addEmployer(self $employer): self
    {
        if (!$this->employers->contains($employer)) {
            $this->employers[] = $employer;
            $employer->setProvider($this);
        }
        
        return $this;
    }
    
    
    public function removeEmployer(self $employer): self
    {
        if ($this->employers->contains($employer)) {
            $this->employers->removeElement($employer);
            // set the owning side to null (unless already changed)
            if ($employer->getProvider() === $this) {
                $employer->setProvider(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @return Collection|self[]
     */
    public function getEmployees(): Collection
    {
        return $this->employees;
    }
    
    public function addEmployee(self $employee): self
    {
        if (!$this->employees->contains($employee)) {
            $this->employees[] = $employee;
            $employee->setEmployer($this);
        }
        
        return $this;
    }
    
    
    public function removeEmployee(self $employee): self
    {
        if ($this->employees->contains($employee)) {
            $this->employees->removeElement($employee);
            // set the owning side to null (unless already changed)
            if ($employee->getEmployer() === $this) {
                $employee->setEmployer(null);
            }
        }
        
        return $this;
    }
    
    /**
     * @Assert\Callback
     */
    public function validate(ExecutionContextInterface $context, $payload)
    {
        if (stripos($this->getStreet(), 'ul') !== false) {
            $context->buildViolation('do you really need to use the prefix ul')
                ->atPath('street')
                ->addViolation();
        }
    }
    
    public function getAgreedTermsAt(): ?\DateTimeInterface
    {
        return $this->agreedTermsAt;
    }
    
    public function agreeTerms(): self
    {
        $this->agreedTermsAt = new \DateTime();
        
        return $this;
    }
    
    public function isProvider()
    {
        return $this->getProvider() != null;
    }
    
    public function isEmployer()
    {
        return $this->getEmployer() != null;
    }
    
    public function populate(UserFormModel $model): self
    {
        $this->setEmail($model->email);
        $this->setFirstName($model->firstName);
        $this->setLastName($model->lastName);
        $this->setStreet($model->street);
        $this->setPostalCode($model->postalCode);
        $this->setCity($model->city);
        
        $this->setProvider($model->provider);
        $this->setEmployer($model->employer);
        
        return $this;
    }
    
}
