<?php

namespace spec\App\Entity;

use App\Entity\Issue;
use PhpSpec\ObjectBehavior;

class IssueSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Issue::class);
    }
}
