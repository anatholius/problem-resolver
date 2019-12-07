import React, {Component} from 'react';
import {
    Block,
    BlockTitle,
    Button,
    Col,
    Link,
    List,
    ListItem,
    Navbar,
    NavLeft,
    NavRight,
    NavTitle,
    Page,AccordionContent,
    Row,
    Toolbar,
} from 'framework7-react';


export default class HomePage extends Component {
    displayName = 'HomePage';
    
    constructor(props, context) {
        super(props, context);
        console.log('HomePage.props', props);
        console.log('context', context);
    }
    
    render() {
        return <Page>
            <Navbar>
                <NavLeft>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
                </NavLeft>
                <NavTitle>My App</NavTitle>
                <NavRight>
                    <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
                </NavRight>
            </Navbar>
            <Toolbar bottom>
                <Link>Left Link</Link>
                <Link>Right Link</Link>
            </Toolbar>
            <Block strong>
                <BlockTitle>Jak rozwiązać problem?</BlockTitle>
                <p>Aby móc myśleć o rozwiązywaniu problemu należy sobie zdać sprawę z podstawowego znaczenia kwestii istnienia problemu.</p>
                <p>Dużo pracy w rozwiązywaniu problemu polega na zrozumieniu istoty problemu. Zamiast skupiać się objawach, należy poszukać źródła problemu. Jeśli problem ma przyczynę i tą przyczynę da się zlikwidoować to tym samym rozwiązuje się problem.</p>
                <h5>Aby skutecznie rozwiązywać problemy, potrzebne są kluczowe umiejętności takie jak:</h5>
                <List accordionList>
                    <ListItem accordionItem title="Kreatywność">
                        <AccordionContent>
                            <Block>
                                <p>
                                    Problemy są zazwyczaj rozwiązywane intuicyjnie lub systematycznie. Intuicja jest używana, gdy nie jest potrzebna nowa wiedza, tzn. wiesz wystarczająco dużo, aby móc podjąć szybką decyzję i rozwiązać problem lubużywasz zdrowego rozsądku lub doświadczenia, aby rozwiązać problem. Bardzo złożone problemy lub problemy, których wcześniej nie doświadczyłeś, prawdopodobnie będą wymagać bardziej systematycznego i logicznego podejścia do ich rozwiązania, a do tego będziesz potrzebował kreatywnego myślenia.
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title="Umiejętności badawcze">
                        <AccordionContent>
                            <Block>
                                <p>
                                    (Umiejętności szukania/badania) - Zdefiniowanie i rozwiązanie problemów często wymaga przeprowadzenia pewnych badań: może to być prosta wyszukiwarka Google lub bardziej rygorystyczny projekt badawczy.
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title="Praca zespołowa">
                        <AccordionContent>
                            <Block>
                                <p>
                                    Wielee problemów można zdefiniować i rozwiązać dzięki wkładowi innych osób. Praca zespołowa nie koniecznie musi dotyczyć pracy zawodowej, ale jest równie ważna w domu, szole czy w towarzystwie znajomych.
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title="Inteligencja emocjonalna">
                        <AccordionContent>
                            <Block>
                                <p>
                                    Warto rozważyć wpływ, jaki problem i/lub jego rozwiązanie ma na ciebie i inne osoby. Inteligencja emocjonalna, umiejętność rozpoznawania emocji u siebie i innych, pomoże ci znaleźć odpowiednie rozwiązanie
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title="Zarządzanie ryzykiem">
                        <AccordionContent>
                            <Block>
                                <p>
                                    Rozwiązanie problemu wiąże się z pewnym ryzykiem - ryzyko to należy porównać z nierozwiązaniem problemu
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                    <ListItem accordionItem title="Podejmowanie decyzji">
                        <AccordionContent>
                            <Block>
                                <p>
                                    Rozwiązywanie problemów i podejmowanie decyzji to ściśle powiązane umiejętności, zaś podejmowanie decyzji jest ważną częścią procesu rozwiązywania problemów, ponieważ często będziesz mieć do czynienia z różnymi opcjami i alternatywami.
                                </p>
                            </Block>
                        </AccordionContent>
                    </ListItem>
                </List>
            </Block>
            <Block strong>
                <BlockTitle bold>Co to problem?</BlockTitle>
                The Concise Oxford Dictionary (1995) definiuje go jako:
                <blockquote>Wątpliwa lub trudna sprawa wymagająca rozwiązania</blockquote>
                oraz
                <blockquote>Coś trudnego do zrozumienia, osiągnięcia lub rozwiązania</blockquote>
                <b>Warto również wziąć pod uwagę nasz własny pogląd na problem</b>
                <p>Jesteśmy stale narażeni na możliwości w życiu, w pracy, w szkole i w domu. Jednak wiele możliwości jest straconych lub nie jest w pełni wykorzystanych. Często nie jesteśmy pewni jak skorzystać z okazji i tworzymy bariery, powody dla których nie możemy z tego skorzystać. Bariery te mogą przekształcić potencjalnie pozytywną sytuację w negatywną - problem.</p>
                <p>Czy brakuje nam dużego problemu? Ludzką naturą jest zauważanie i koncentrowanie się na małych, łatwych do rozwiązania problemach, ale o wiele trudniej jest pracować nad dużymi problemami, które mogą powodować niektóre z mniejszych.</p>
                <p>Mając do czynienia z potencjalnym problemem warto rozważyć następujące pytania:</p>
                <p>Czy problem jest faktycznym problemem, czy tylko tak go postrzegamy</p>
                <p>Czy ten problem nie jest przypadkiem szansą?</p>
                <p>Czy problem wymaga rozwiązania?</p>
            </Block>
            <Block strong>
                <BlockTitle bold><b>Wszystkie problemy mają dwie cechy wspólne: cele i bariery</b></BlockTitle>
                <h3>Cele</h3>
                <b>Problemy obejmują działania w celu osiągnięcia pewnego obiektywnego lub pożądanego stanu rzeczy i mogą obejmować uniknięcie sytuacji lub zdarzenia</b>
                <p>Celami może być wszystko co chcesz osiągnąć lub gdzie chcesz być. Jeśli jesteś głodny, towim celem jest prawdopodobnie coś zjeść. Jeśli jesteś przedsiębiorcą twoim celem główneym jest uzyskiwanie zysków z przychodów, a ten główny cel może wymagać podzielenia na wiele celów cząstkowych, aby osiągnść ostateczny cel jakim jest uzyskanie tych zysków.</p>
                <h3>Bariery</h3>
                <b>Gdyby nie było barier na drodze do osiągnięcia celu, nie było by problemów. Rozwiązywanie problemów polega na pokonywaniu barier lub przeszkód, które uniemożliwiają natychmiastowe osiągnięcie celu.</b>
                <p>Zgodnie z naszymi przykładami powyżej, jeśli czujesz się głodnym twoim celem jest jedzenie. Barierą tego może być brak żywności. Należy więc udać się do sklepu i kupić jedzenie, usuwając tym barierę i rozwiązując ten problem. W przypadku przedsiębiory barier może być znacznie więcej, zatem należy spróbować je rozpoznać i usunąć lub znaleźć inne sposoby osiągnięcia swoich biznesowych celów.</p>
            </Block>
            <Block>
                <p>proba rozwiązanie złożonego problemu może być błędem. Stare powiedzenie mówi, że „problem wspólny to problem zmniejszony o połowę”. Zatem podzielenie problemem z kimś innym może być dobrym sposobem na zbliżenie się do jego rozwiązania.</p>
            </Block>
            <Block>
                <h2>Etapy rozwiązywania problemów</h2>
                <b>Skuteczne rozwiązywanie problemów zwykle obejmuje szereg kroków lub etapów, takich jak te opisane poniżej.</b>
                <h3>1. Identyfikacja problemu</h3>
                <b>Ten etap obejmuje: wykrycie i rozpoznanie problemu; określenie charakteru problemu; określenie problemu</b>
                <p>Pierwsza faza rozwiązywania problemów może wydawać się oczywista, ale często wymaga więcej przemyśleń i analiz. Samo zidentyfikowanie problemu może być trudnym zadaniem. Czy w ogóle jest to problem? Jaka jest natura problemu, czy w rzeczywistości istnieje wiele problemów? Jak najlepiej zdefiniować problem? Spędzając trochę czasu na zdefiniowaniu problemu nie tylko zrozumiesz go lepiej, ale będziesz w stanie przekazać innym jego naturę, co prowadzi do drugiej fazy.</p>
                <h3>2. Struktura problemu</h3>
                <b>Ten etap obejmuje: okres obserwacji, staranną kontrolę, ustalenie faktów i wypracowanie jasnego obrazu problemu</b>
                <p>Po zidentyfikowaniu problemu, jego ustrukturyzowanie polega na uzyskaniu dodatkowych informacji o problemie i zwiększeniu zrozumienia. W tej fazie chodzi o ustalenie faktów i analizę, budowanie bardziej kompleksowego obrazu zarówno celu(celów), jak i bariery (barier). Ten etap może nie być konieczny w przypadku bardzo prostych problemów, ale jest niezbędny w przypadku problemów o bardziej złożonym charakterze</p>
                <h3>3. Poszukiwanie możliwych rozwiązań</h3>
                <b>Na tym etapie wygenerujesz szereg możliwych kierunków działania, ale przy niewielkiej próbie ich oceny na tym etapie</b>
                <p>Na podstawie informacji zebranych w pierwszych dwóch fazach struktury rozwiązywania problemów nadszedł czas, aby zacząć myśleć o możliwych rozwiązaniach zidentyfikowanego problemu. W sytuacji grupowej etap ten jest często przeprowadzany jako burza mózgów, pozwalając każdej osobie w grupie wyrazić swoje poglądy na temat możliwych rozwiązań (lub rozwiązań częścioywych). W organizacjach różne osoby będą miały różną wiedzę specjalistyczną w różnych obszarach i dlatego przydatne jest wysłuchanie opinii każdej zainteresowanej strony</p>
                <h3>4. Podejowanie decyzji</h3>
                <b>Ten etap obejmuje analizę różnych możliwych kierunków działąnia, a następnie wybrania najlepszego rozwiązania do wdrożenia</b>
                <p>Jest to byż może najbardziej  złożona część procesu rozwiązywania problemów. Kontynuując poprzedni krok, nadszedł czas, aby spojrzeć na każde potencjalne rozwiązani i dokładnie je porzeanalizować. Niektóre rozwiązania mogą być niemożliwe z powdu innych cproblemówm takich jak ograniczenie czasowe lub budżety. Na tym etapie ważne jest również zastanowienie się co może się stać, jeśli nic nie zostanie zrobione w celu rozwiązania problemu - czasami próba rozwiązania praoblemu, który prowadzi do wielu innych problemów, wymaga bardzo kreatywnego myślniea i innowacyjnych pomysłów.</p>
                <p>Na koniec podejmij decyzję, jaki sposób działania - podejmowanie decyzji jest samo w somie ważną umiejętnością. (Na ten temat podstrona do dorobienia)</p>
                <h3>5. Realizacja</h3>
                <b>Ten etap obejmuje przyjęcie i przeprowadzenie weybranego kierunku działania</b>
                <p>Wdrożenie oznacza działanie na wybrane rozwiązanie. Podczas wdrażania może pojaweić się więcej p[roblemów, zwłaszcza jeśli identyfikacja lub struktura pierwotnego problemu nie zostały w pełni przeprowadzone.</p>
                <h3>6. Monitorowanie / poszukiwanie opinii</h3>
                <b>Ostatni etap dotyczy przeglądu wyników rozwiązywania problemów w danym okresie, w tym uzyskania informacji zwrotnej na temat powodzenia wyników wybranego rozwiązania</b>
                <p>Ostatni etap rozwiązywania problemów dotyczy sprawdzenia, czy proces się powiódł. Można to osiągnąć poprzez monitorowanie i uzyskiwanie informacji zwrotnych od osób dotkniętych wszelkimi wprowadzonymi zmianami. Dobrą praktyką jest rejestrowanie wyników i wszelkich dodatkowych problemów, które wystąpiły.</p>
            </Block>
            <br/><br/>
            <BlockTitle>Navigation</BlockTitle>
            <List>
                <ListItem link="/about/" title="About"></ListItem>
                <ListItem link="/form/" title="Form"></ListItem>
            </List>
            <BlockTitle>Modals</BlockTitle>
            <Block strong>
                <Row>
                    <Col width="50">
                        <Button fill raised popupOpen="#popup">Popup</Button>
                    </Col>
                    <Col width="50">
                        <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
                    </Col>
                </Row>
            </Block>
            <BlockTitle>Panels</BlockTitle>
            <Block strong>
                <Row>
                    <Col width="50">
                        <Button fill raised panelOpen="left">Left Panel</Button>
                    </Col>
                    <Col width="50">
                        <Button fill raised panelOpen="right">Right Panel</Button>
                    </Col>
                </Row>
            </Block>
            <List>
                <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
                <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
            </List>
        </Page>;
    }
}
