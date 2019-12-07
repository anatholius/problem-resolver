<?php

declare(strict_types=1);

namespace DoctrineMigrations;


use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191207105237 extends AbstractMigration
{
    
    public function getDescription(): string
    {
        return '';
    }
    
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');
        
        $this->addSql('CREATE TABLE dictionary (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, term VARCHAR(255) NOT NULL, definition CLOB NOT NULL, related_to CLOB DEFAULT NULL --(DC2Type:simple_array)
        )');
        $this->addSql('CREATE TABLE goal (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description CLOB DEFAULT NULL, is_done BOOLEAN NOT NULL, obstacle_id INTEGER DEFAULT NULL, opportunity_id INTEGER DEFAULT NULL, problem_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE TABLE obstacle (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description CLOB NOT NULL, opportunity_id INTEGER DEFAULT NULL, problem_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE TABLE opportunity (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description CLOB NOT NULL, problem_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE TABLE problem (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description CLOB NOT NULL)');
        $this->addSql('CREATE TABLE solution (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, summary CLOB NOT NULL, reproduction CLOB NOT NULL --(DC2Type:simple_array)
        , guide CLOB NOT NULL, examples CLOB DEFAULT NULL --(DC2Type:simple_array)
        , problem_id INTEGER DEFAULT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9F3329DBA0DCED86 ON solution (problem_id)');
        $this->addSql('CREATE TABLE tutorial (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, summary CLOB NOT NULL)');
        $this->addSql('CREATE TABLE tutorial_step (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, position INTEGER NOT NULL, title VARCHAR(255) NOT NULL, description CLOB NOT NULL, tutorial_id INTEGER NOT NULL)');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }
    
    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');
        
        $this->addSql('DROP TABLE dictionary');
        $this->addSql('DROP TABLE goal');
        $this->addSql('DROP TABLE obstacle');
        $this->addSql('DROP TABLE opportunity');
        $this->addSql('DROP TABLE problem');
        $this->addSql('DROP TABLE solution');
        $this->addSql('DROP TABLE tutorial');
        $this->addSql('DROP TABLE tutorial_step');
        $this->addSql('DROP TABLE user');
    }
}
