import React, { useState, useEffect } from 'react';
import DeckTitle from './DeckTitle';
import CardsCollectedDisplay from './CardsCollectedDisplay';
import CardsSelectedDisplay from './CardsSelectedDisplay';
import styles from './createnewdeck.module.css';

const MAX_CARDS = 20;
const MAX_DUPLICATES = 3;

const CreateNewDeck = () => {
    const [deckTitle, setDeckTitle] = useState('');
    const [selectedCards, setSelectedCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(''), 3000);
            return () => clearTimeout(timer); // Limpia el temporizador al desmontar
        }
    }, [errorMessage]);

        const [collectedCards, setCollectedCards] = useState([
                { id: 1, name: 'Liche', category: 'Monster', attribute: 'Darkness', type: 'Demon', rarity: 'Legendary', image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735475902/lichetcg_ko6go8.png', description: 'Restos putrefactos de un poderoso mago que abrazó la no muerte para evitar abandonar este mundo y se convirtió en un muerto viviente hambriento de conocimiento mágico. El toque del liche es pernicioso, pues paraliza e incluso necrosa la carne. Para proteger su existencia, el liche esconde su alma en una filacteria, que, alimentada con almas, asegura su retorno en caso de que lo destruyan. Acabar con la filacteria acabará con el liche.' },
                {
                    id: 2, name: 'Aboleth',
                    category: 'Monster',
                    attribute: 'Water',
                    type: 'Beast',
                    rarity: 'Epic',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735475308/abolethtcg_gdcdbv.png',
                    description: 'Esta alargada criatura pisciforme dotada de tres musculosos tentáculos y una formidable cola es el señor indiscutible de las aguas más tenebrosas desde épocas pretéritas. Su cuerpo escamoso exuda un negro icor que contamina el agua, mientras que sus crueles ojos destellan rojos, especialmente cuando usa su poderosa mente para subyugar a cuanto humanoide encuentre. Lo último que ven sus presas al dirigirse al agua con una boba sonrisa son sus fauces, dotada de hilera tras hilera de largos y puntiagudos dientes.'
                },
                {
                    id: 3,
                    name: 'Arpía',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Demon',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735476401/arpiatcg_expmlo.png',
                    description: 'Las arpías son monstruosidades que mezclan atributos de mujer con los de ave de carroña. Son capaces de volar con sus emplumadas alas y de cantar de forma tan sublime que atraen a todo el que las escucha como corderos al matadero. Las arpías blanden toscos garrotes a veces hechos con los mondos huesos de sus víctimas.'
                },
                {
                    id: 4,
                    name: 'Basilisco',
                    category: 'Monster',
                    attribute: 'Earth',
                    type: 'Beast',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735476840/basiliscotcg_vsk39a.png',
                    description: 'El basilisco es un pesado reptil dotado de hasta ocho pares de patas y una mandíbula repleta de ponzoña venenosa, un depredador vicioso cuya mirada convierte a sus presas literalmente en roca. Mora en páramos de polvo, piedra rota y arena, pues el basilisco se alimenta de los seres vivos que convierte en mineral para triturar con sus brutales fauces. Aunque peligrosa, la caza del basilisco es muy rentable, ya que, de obtener sus huevos, se le podrá entrenar para convertirse en un leal guardián, y su veneno vale el rescate de un príncipe mercader en según qué círculos.'
                },
                {
                    id: 5,
                    name: 'Can del Infierno',
                    category: 'Monster',
                    attribute: 'Fire',
                    type: 'Beast',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735477255/caninfiernotcg_uhzvnq.png',
                    description: 'Estos delgados sabuesos de cuerpo rojizo, ojos incandescentes y garras color carbón son cazadores extraordinarios cuando se encuentran en grupo, siendo capaces de derribar y cazar a presas mucho más grandes que ellos. El can del infierno recorre en manada las regiones infernales movido por su gran intelecto y aguda maldad, aunque no es raro ver en otros planos ejemplares que han sido invocados como guardianes o tropas de asalto.'
                },
                {
                    id: 6,
                    name: 'Cubo Gelatinoso',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Beast',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735478237/cubogelatinosotcg_khg7ox.png',
                    description: 'Este extraño monstruo es una masa gelatinosa transparente con forma de cubo gigante que recorre pasadizos y cavernas. En su interior se pueden encontrar los restos y tesoros de las últimas víctimas que ha digerido, al alcance de quien se atreva a meter la mano dentro del voraz cubo gelatinoso.'
                },
                {
                    id: 7,
                    name: 'Dríada',
                    category: 'Monster',
                    attribute: 'Earth',
                    type: 'Fairy',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735478480/driadatcg_nggrvg.png',
                    description: 'Una hermosa raza de fatas femeninas vinculadas al mundo natural. Las dríadas viven para proteger sus boscosos dominios y espían a los extraños ocultas entre los árboles. Son veleidosas y poseen numerosos dones, como aquel con el que embelesan a los incautos para que hagan su voluntad. Este encanto es peligroso, pero caer ante él es un riesgo a correr si se quiere conocer los secretos que albergan los bosques de las fatas.'
                },
                {
                    id: 8,
                    name: 'Ent',
                    category: 'Monster',
                    attribute: 'Earth',
                    type: 'Plant',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735479562/enttcg_i7swf2.png',
                    description: 'El gigantesco árbol comienza a moverse, rompiendo las rocas bajo sus poderosas manos al mismo tiempo que de su boca emerge una voz profunda y amigable que anima a los suyos a unírsele en su caminar. Como si respondiesen a la llamada, varios cedros se desplazan hasta ponerse a su par, haciendo temblar la tierra.'
                },
                {
                    id: 9,
                    name: 'Esqueleto',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Zombie',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735479839/esqueletotcg_ol8txl.png',
                    description: 'El roñoso esqueleto de un guerrero de antaño que abandona su tumba animado por la fuerza de la nigromancia, blandiendo las armas que usara en vida y vistiendo una degradada armadura. Ataca sin miedo, abriendo su boca para elevar un mudo grito de guerra.'
                },
                {
                    id: 10,
                    name: 'Goblin',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Beast',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735576450/goblintcg_fvw2gh.png',
                    description: 'Este pequeño y detestable humanoide de piel verde suele acompañar a otros trasgoides en combate, aunque su moral es baja y suelen echarse a correr cuando la situación se complica. Aunque es un combatiente mediocre, su gran número compensa esa deficiencia.'
                },
                {
                    id: 11,
                    name: 'Orco',
                    category: 'Monster',
                    attribute: 'Earth',
                    type: 'Warrior',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735577049/orcotcg_chsw22.png',
                    description: 'Humanoide de piel verdosa y potente musculatura que saquea la civilización desde las tierras salvajes. Los orcos son saqueadores violentos con un desarrollado gusto por la sangre y el combate.'
                },
                {
                    id: 12,
                    name: 'Pegaso',
                    category: 'Monster',
                    attribute: 'Wind',
                    type: 'Beast',
                    rarity: 'Epic',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735577256/pegasotcg_nupska.png',
                    description: 'Hermoso celestial similar a un caballo alado blanco, tan inteligente como un humano.'
                },
                {
                    id: 13,
                    name: 'Íncubo',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Demon',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735577621/incubotcg_h8jh3i.png',
                    description: 'Estos seductores infernales toman el aspecto de jóvenes humanoides dotados de alas y otros rasgos blasfemos que, sin embargo, no reducen su atractivo. Las súcubos y los íncubos viven para arrastrar a los mortales a las simas de la decadencia mediante irresistibles promesas, oscuros favores y placeres prohibidos. Pero hay que tener cuidado, pues el contacto carnal con un infernal de este tipo drena tanto el alma como el cuerpo, y los incautos pueden llegar a morir consumidos por ellos.'
                },
                {
                    id: 14,
                    name: 'Vampiro',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Demon',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735578093/vampirotcg_ov2zgi.png',
                    description: 'El oscuro señor de la noche es un guerrero de blanca piel, largos colmillos, regia apariencia y ojos de mirada lobuna. Se alimenta de sangre y tal es su maldad que el mismo sol lo aborrece tanto que hace que su piel arda, por lo que solo actúa bajo el manto nocturno. Comanda hordas de bestias y alimañas leales y es capaz de levantar como un fiel esbirro a los enemigos con los que haya saciado su sed de sangre.'
                },
                {
                    id: 15,
                    name: 'Gárgola',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Beast',
                    rarity: 'Common',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735578319/gargolatcg_howfyv.png',
                    description: 'Rocosas aberraciones aladas, famosas tanto por su aspecto monstruoso como por su maldad. Es frecuente encontrarlas al servicio de las fuerzas del mal, pues gracias a su mimetismo natural y brutales garras son grandes guardianes.'
                },
                {
                    id: 16,
                    name: 'Doppelganger',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Warrior',
                    rarity: 'Legendary',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735579791/doppelgangertcg_pze0h4.png',
                    description: 'Este humanoide de aspecto gris y carente de rasgos, a excepción de sus dos enormes ojos amarillos, es un mentiroso consumado y un maestro de la discreción, capaz incluso de cambiar de forma. El doppelgánger gusta de usurpar la vida de otros humanoides, ya sea para sobrevivir, llevar a cabo algún vil plan o sencillamente encontrar compañía. Para ello, se sirve de su polimorfismo y de la capacidad de leer los pensamientos superficiales de la gente.'
                },
                {
                    id: 17,
                    name: 'Deva',
                    category: 'Monster',
                    attribute: 'Light',
                    type: 'Warrior',
                    rarity: 'Epic',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735580704/devatcg_gfp0ku.png',
                    description: 'Los devas son humanoides angelicales de piel ligeramente azulada que están dotados de poderosas alas de cisne capaces de levantar del suelo sus apolíneos cuerpos. Aunque hermosos, los mensajeros de los altos señores celestiales no dudan en adquirir formas mortales, de humanoides o animales, para cumplir la voluntad de sus amos. Combaten blandiendo pesadas mazas de luz solar, aunque suelen detenerse para sanar mediante sus milagrosas artes a los aliados heridos, trayendo de vuelta incluso a los muertos.'
                },
                {
                    id: 18,
                    name: 'Ángel de Platino',
                    category: 'Support',
                    attribute: 'Light',
                    type: 'Warrior',
                    rarity: 'Epic',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735652249/angeldeplatinotcg_gibmoo.png',
                    description: 'Criatura artefacto que puede volar. En su corazón descansa el secreto de la inmortalidad. Con él, no puedes perder el juego y tus oponentes no pueden ganarlo.'
                },
                {
                    id: 19,
                    name: 'Loto de Obsidiana',
                    category: 'Support',
                    attribute: 'Earth',
                    type: 'Plant',
                    rarity: 'Legendary',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735653496/lotoobsidianatcg_xepbjd.png',
                    description: 'Estos lotos son flores raras que se encuentran en los pantanos de la jungla. Su jugo es un veneno mortal, al igual que su forma en polvo, y el aroma de sus flores trae sueños malignos. Es infamemente utilizado por algunos magos, quienes queman el polen e inhalan el humo verde. Aunque esto causa un sueño similar al coma, las pesadillas carmesí en su interior restauran sus poderes mágicos.'
                },
                {
                    id: 20,
                    name: 'Relámpago',
                    category: 'Support',
                    attribute: 'Fire',
                    type: 'Warrior',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735655230/relampagotcg_qmx4jk.png',
                    description: 'Tormenta de rayos fulminantes que causan un daño severo a aquellos a quien van dirigidos. Invocada desde la furia profunda de un poderoso hechicero.'
                },
                {
                    id: 21,
                    name: 'Relámpago',
                    category: 'Support',
                    attribute: 'Fire',
                    type: 'Warrior',
                    rarity: 'Rare',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735655230/relampagotcg_qmx4jk.png',
                    description: 'Tormenta de rayos fulminantes que causan un daño severo a aquellos a quien van dirigidos. Invocada desde la furia profunda de un poderoso hechicero.'
                },
                {
                    id: 22,
                    name: 'Doppelganger',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Warrior',
                    rarity: 'Legendary',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735579791/doppelgangertcg_pze0h4.png',
                    description: 'Este humanoide de aspecto gris y carente de rasgos, a excepción de sus dos enormes ojos amarillos, es un mentiroso consumado y un maestro de la discreción, capaz incluso de cambiar de forma. El doppelgánger gusta de usurpar la vida de otros humanoides, ya sea para sobrevivir, llevar a cabo algún vil plan o sencillamente encontrar compañía. Para ello, se sirve de su polimorfismo y de la capacidad de leer los pensamientos superficiales de la gente.'
                },
                {
                    id: 23,
                    name: 'Doppelganger',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Warrior',
                    rarity: 'Legendary',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735579791/doppelgangertcg_pze0h4.png',
                    description: 'Este humanoide de aspecto gris y carente de rasgos, a excepción de sus dos enormes ojos amarillos, es un mentiroso consumado y un maestro de la discreción, capaz incluso de cambiar de forma. El doppelgánger gusta de usurpar la vida de otros humanoides, ya sea para sobrevivir, llevar a cabo algún vil plan o sencillamente encontrar compañía. Para ello, se sirve de su polimorfismo y de la capacidad de leer los pensamientos superficiales de la gente.'
                },
                {
                    id: 24,
                    name: 'Doppelganger',
                    category: 'Monster',
                    attribute: 'Darkness',
                    type: 'Warrior',
                    rarity: 'Legendary',
                    image: 'https://res.cloudinary.com/dsd7efrba/image/upload/v1735579791/doppelgangertcg_pze0h4.png',
                    description: 'Este humanoide de aspecto gris y carente de rasgos, a excepción de sus dos enormes ojos amarillos, es un mentiroso consumado y un maestro de la discreción, capaz incluso de cambiar de forma. El doppelgánger gusta de usurpar la vida de otros humanoides, ya sea para sobrevivir, llevar a cabo algún vil plan o sencillamente encontrar compañía. Para ello, se sirve de su polimorfismo y de la capacidad de leer los pensamientos superficiales de la gente.'
                },
            ]);

    const handleTitleChange = (newTitle) => {
        setDeckTitle(newTitle);
    };

    const handleAddCard = (card) => {
        const cardCount = selectedCards.filter((c) => c.name === card.name).length;

        if (selectedCards.length >= MAX_CARDS) {
            setErrorMessage(`⚠️ No puedes añadir más de ${MAX_CARDS} cartas al mazo.`);
            return;
        }

        if (cardCount >= MAX_DUPLICATES) {
            setErrorMessage(`⚠️ No puedes agregar más de ${MAX_DUPLICATES} copias de "${card.name}".`);
            return;
        }

        setSelectedCards([...selectedCards, card]);
    };

    const handleRemoveCard = (card) => {
        const updatedCards = selectedCards.filter((c, index) => index !== selectedCards.indexOf(card));
        setSelectedCards(updatedCards);
    };

    return (
        <div className={styles.createNewDeck}>
            <DeckTitle onTitleChange={handleTitleChange} />
            <div className={styles.deckContent}>
                <div className={styles.cardsCollectedWrapper}>
                    <CardsCollectedDisplay
                        cards={collectedCards}
                        onAddCard={handleAddCard}
                    />
                </div>
                <div className={styles.cardsSelectedWrapper}>
                    <CardsSelectedDisplay
                        cards={selectedCards}
                        onRemoveCard={handleRemoveCard}
                    />
                </div>
            </div>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <button
                disabled={deckTitle.trim() === '' || selectedCards.length !== MAX_CARDS}
                onClick={() => alert('Mazo guardado')}
            >
                Guardar Mazo
            </button>
        </div>
    );
};

export default CreateNewDeck;