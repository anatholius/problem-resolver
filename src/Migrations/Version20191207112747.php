<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20191207112747 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TEMPORARY TABLE __temp__dictionary AS SELECT id, term, definition, related_to FROM dictionary');
        $this->addSql('DROP TABLE dictionary');
        $this->addSql('CREATE TABLE dictionary (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, term VARCHAR(255) NOT NULL COLLATE BINARY, definition CLOB NOT NULL COLLATE BINARY, related_to CLOB DEFAULT NULL --(DC2Type:simple_array)
        )');
        $this->addSql('INSERT INTO dictionary (id, term, definition, related_to) SELECT id, term, definition, related_to FROM __temp__dictionary');
        $this->addSql('DROP TABLE __temp__dictionary');
        $this->addSql('DROP INDEX UNIQ_9F3329DBA0DCED86');
        $this->addSql('CREATE TEMPORARY TABLE __temp__solution AS SELECT id, title, summary, reproduction, guide, examples, problem_id FROM solution');
        $this->addSql('DROP TABLE solution');
        $this->addSql('CREATE TABLE solution (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL COLLATE BINARY, summary CLOB NOT NULL COLLATE BINARY, reproduction CLOB NOT NULL COLLATE BINARY --(DC2Type:simple_array)
        , guide CLOB NOT NULL COLLATE BINARY, problem_id INTEGER DEFAULT NULL, examples CLOB DEFAULT NULL --(DC2Type:simple_array)
        )');
        $this->addSql('INSERT INTO solution (id, title, summary, reproduction, guide, examples, problem_id) SELECT id, title, summary, reproduction, guide, examples, problem_id FROM __temp__solution');
        $this->addSql('DROP TABLE __temp__solution');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9F3329DBA0DCED86 ON solution (problem_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, email, roles, password FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL COLLATE BINARY, roles CLOB NOT NULL COLLATE BINARY --(DC2Type:json)
        , password VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, street VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, avatar VARCHAR(255) DEFAULT NULL, agreed_terms_at DATETIME DEFAULT NULL, provider_id INTEGER DEFAULT NULL, employer_id INTEGER DEFAULT NULL)');
        $this->addSql('INSERT INTO user (id, email, roles, password) SELECT id, email, roles, password FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TEMPORARY TABLE __temp__dictionary AS SELECT id, term, definition, related_to FROM dictionary');
        $this->addSql('DROP TABLE dictionary');
        $this->addSql('CREATE TABLE dictionary (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, term VARCHAR(255) NOT NULL, definition CLOB NOT NULL, related_to CLOB DEFAULT \'NULL --(DC2Type:simple_array)\' COLLATE BINARY --(DC2Type:simple_array)
        )');
        $this->addSql('INSERT INTO dictionary (id, term, definition, related_to) SELECT id, term, definition, related_to FROM __temp__dictionary');
        $this->addSql('DROP TABLE __temp__dictionary');
        $this->addSql('DROP INDEX UNIQ_9F3329DBA0DCED86');
        $this->addSql('CREATE TEMPORARY TABLE __temp__solution AS SELECT id, title, summary, reproduction, guide, examples, problem_id FROM solution');
        $this->addSql('DROP TABLE solution');
        $this->addSql('CREATE TABLE solution (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title VARCHAR(255) NOT NULL, summary CLOB NOT NULL, reproduction CLOB NOT NULL --(DC2Type:simple_array)
        , guide CLOB NOT NULL, problem_id INTEGER DEFAULT NULL, examples CLOB DEFAULT \'NULL --(DC2Type:simple_array)\' COLLATE BINARY --(DC2Type:simple_array)
        )');
        $this->addSql('INSERT INTO solution (id, title, summary, reproduction, guide, examples, problem_id) SELECT id, title, summary, reproduction, guide, examples, problem_id FROM __temp__solution');
        $this->addSql('DROP TABLE __temp__solution');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9F3329DBA0DCED86 ON solution (problem_id)');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('CREATE TEMPORARY TABLE __temp__user AS SELECT id, email, roles, password FROM user');
        $this->addSql('DROP TABLE user');
        $this->addSql('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles CLOB NOT NULL --(DC2Type:json)
        , password VARCHAR(255) NOT NULL COLLATE BINARY)');
        $this->addSql('INSERT INTO user (id, email, roles, password) SELECT id, email, roles, password FROM __temp__user');
        $this->addSql('DROP TABLE __temp__user');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
    }
}
