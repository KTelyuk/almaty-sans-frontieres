/* Exact supplied stories live in this file. Do not rewrite them.
   audio.fr / audio.ru give the path of a recording, for example
   "audio/ru/gandhi.mp3" (made by tools/make_audio.py). Until the file
   exists, the audioguide keeps showing "recording to come". */
window.ASF = window.ASF || {};

window.ASF.content = {
  places: [
    {
      id: "gandhi",
      lat: 43.2438034,
      lng: 76.8975794,
      osm: "https://www.openstreetmap.org/node/1020229784",
      cardTitle: {
        fr: "Le monument du Mahatma Gandhi",
        ru: "Памятник Махатме Ганди"
      },
      mapLabel: {
        fr: "Monument du Mahatma Gandhi",
        ru: "Памятник Махатме Ганди"
      },
      category: { fr: "Paix", ru: "Мир" },
      address: {
        fr: "Partie est du parc Mahatma Gandhi, entre les rues Chevtchenko, Gagarine, Jamboul et Jarokov, Almaty.",
        ru: "Восточная часть парка имени Махатмы Ганди, между улицами Шевченко, Гагарина, Жамбыла и Жарокова, Алматы."
      },
      photo: {
        src: "images/gandhi.webp",
        position: "center 30%",
        alt: {
          fr: "Statue de bronze de Mahatma Gandhi sur un socle portant des inscriptions, dans un parc d’Almaty en automne.",
          ru: "Бронзовая статуя Махатмы Ганди на постаменте с надписями в осеннем парке Алматы."
        }
      },
      audio: { fr: "audio/fr/gandhi.mp3", ru: "audio/ru/gandhi.mp3" },
      story: {
        fr: {
          title: "Le monument du Mahatma Gandhi : un symbole de paix à Almaty",
          paragraphs: [
            "Le monument du Mahatma Gandhi rappelle la présence de la pensée indienne dans l’espace culturel d’Almaty. Gandhi est connu dans le monde entier pour son engagement en faveur de la non-violence, de la résistance pacifique et du respect de la dignité humaine. Ses idées ont dépassé les frontières de l’Inde et continuent d’inspirer des personnes dans de nombreux pays.",
            "Le monument d’Almaty a été inauguré en octobre 2003. L’initiative de son installation est venue de l’ambassade de l’Inde au Kazakhstan, et la sculpture a été réalisée par Gautam Pal, sculpteur originaire de Mumbai. La cérémonie d’ouverture s’est déroulée en présence de Sumitra Kulkarni, petite-fille de Gandhi.",
            "Ce monument montre comment une personnalité historique peut devenir un symbole partagé par différentes sociétés. Il rappelle que les échanges culturels ne passent pas uniquement par les livres ou les musées : ils peuvent aussi prendre forme dans l’espace public, grâce à des monuments qui invitent les habitants à découvrir des idées venues d’ailleurs.",
            "À Almaty, ce lieu permet de parler de la culture indienne, de la paix et du dialogue entre les peuples. Il illustre une dimension importante de la ville : son ouverture à des références culturelles qui viennent de différentes régions du monde."
          ]
        },
        ru: {
          title: "Памятник Махатме Ганди: символ мира в Алматы",
          paragraphs: [
            "Памятник Махатме Ганди напоминает о присутствии индийской мысли в культурном пространстве Алматы. Ганди известен во всём мире своей приверженностью ненасилию, мирному сопротивлению и уважению человеческого достоинства. Его идеи вышли далеко за пределы Индии и продолжают вдохновлять людей во многих странах.",
            "Памятник в Алматы был открыт в октябре 2003 года. Инициатором его установки выступило посольство Индии в Казахстане, а скульптуру создал Гаутам Пал — скульптор из Мумбаи. На церемонии открытия присутствовала Сумитра Кулкарни, внучка Ганди.",
            "Этот памятник показывает, как историческая личность может стать общим символом для разных обществ. Он напоминает, что культурный обмен происходит не только через книги и музеи: он также проявляется в общественном пространстве благодаря памятникам, которые знакомят жителей с идеями, пришедшими из других стран.",
            "В Алматы это место позволяет говорить об индийской культуре, мире и диалоге между народами. Оно отражает важную особенность города — открытость культурным идеям и традициям из разных уголков мира."
          ]
        }
      }
    },
    {
      id: "chevtchenko",
      lat: 43.2471283,
      lng: 76.9567542,
      osm: "https://www.openstreetmap.org/node/9922628914",
      cardTitle: {
        fr: "Le monument de Taras Chevtchenko",
        ru: "Памятник Тарасу Шевченко"
      },
      mapLabel: {
        fr: "Monument de Taras Chevtchenko",
        ru: "Памятник Тарасу Шевченко"
      },
      category: { fr: "Littérature ukrainienne", ru: "Украинская литература" },
      address: {
        fr: "Intersection de l’avenue Dostyk et de la rue Chevtchenko, Almaty.",
        ru: "Пересечение проспекта Достык и улицы Шевченко, Алматы."
      },
      photo: {
        src: "images/shevchenko.webp",
        position: "center 28%",
        alt: {
          fr: "Monument de Taras Chevtchenko en granit rose : le visage du poète taillé dans un bloc de pierre, à Almaty.",
          ru: "Памятник Тарасу Шевченко из розового гранита: лицо поэта высечено в каменной глыбе, Алматы."
        }
      },
      audio: { fr: "audio/fr/chevtchenko.mp3", ru: "audio/ru/chevtchenko.mp3" },
      story: {
        fr: {
          title: "Taras Chevtchenko : la poésie ukrainienne dans l’espace d’Almaty",
          paragraphs: [
            "Taras Chevtchenko est l’une des figures majeures de la littérature et de la culture ukrainiennes. Poète, écrivain et artiste, il occupe une place importante dans la mémoire culturelle de l’Ukraine. Son parcours est également lié à l’histoire du Kazakhstan : il a vécu en exil dans l’ouest du territoire kazakh entre 1847 et 1857.",
            "Le monument de Taras Chevtchenko a été inauguré à Almaty en août 2000, à l’intersection de l’avenue Dostyk et de la rue Chevtchenko. La sculpture a été réalisée par Vitaliy Ryzhyk et taillée dans du granit provenant de la région de Jytomyr, en Ukraine.",
            "Le choix de cette pierre donne au monument une dimension symbolique : un matériau provenant d’Ukraine a été utilisé pour rendre hommage à un poète ukrainien dans une ville du Kazakhstan. Le monument associe ainsi un lieu, une matière et une mémoire littéraire qui relie plusieurs espaces géographiques.",
            "Cette histoire permet de comprendre que les relations culturelles entre les peuples peuvent se construire à travers la littérature, les souvenirs historiques et les œuvres installées dans les villes. À Almaty, le monument rappelle à la fois l’héritage de Chevtchenko et les liens historiques entre les cultures ukrainienne et kazakhe."
          ]
        },
        ru: {
          title: "Тарас Шевченко: украинская поэзия в пространстве Алматы",
          paragraphs: [
            "Тарас Шевченко — одна из ключевых фигур украинской литературы и культуры. Поэт, писатель и художник, он занимает важное место в культурной памяти Украины. Его биография связана и с историей Казахстана: с 1847 по 1857 год он находился в ссылке на территории Западного Казахстана.",
            "Памятник Тарасу Шевченко в Алматы был открыт в августе 2000 года на пересечении проспекта Достык и улицы Шевченко. Скульптуру создал Виталий Рыжик, а материалом стал гранит из Житомирской области Украины.",
            "Выбор камня придаёт памятнику символическое значение: материал, привезённый из Украины, использовали для увековечения памяти украинского поэта в городе Казахстана. Таким образом, памятник объединяет место, материал и литературную память, связывающую разные географические пространства.",
            "Эта история помогает понять, что культурные связи между народами могут формироваться благодаря литературе, исторической памяти и произведениям, установленным в городах. В Алматы памятник напоминает как о наследии Шевченко, так и об исторических связях украинской и казахской культур."
          ]
        }
      }
    },
    {
      id: "tsoi",
      lat: 43.2497481,
      lng: 76.9491588,
      osm: "https://www.openstreetmap.org/node/9721566077",
      cardTitle: {
        fr: "Le monument de Viktor Tsoï",
        ru: "Памятник Виктору Цою"
      },
      mapLabel: {
        fr: "Monument de Viktor Tsoï",
        ru: "Памятник Виктору Цою"
      },
      category: { fr: "Musique et cinéma", ru: "Музыка и кино" },
      address: {
        fr: "Rue Tulebaïev, près de la rue Kabanbaï Batyr, Almaty.",
        ru: "Улица Тулебаева, недалеко от улицы Кабанбай батыра, Алматы."
      },
      photo: {
        src: "images/tsoi.webp",
        position: "center 35%",
        alt: {
          fr: "Statue de bronze de Viktor Tsoï sur une allée piétonne d’Almaty, devant une plaque portant le titre du film « Igla ».",
          ru: "Бронзовая статуя Виктора Цоя на пешеходной аллее Алматы, перед табличкой с названием фильма «Игла»."
        }
      },
      audio: { fr: "audio/fr/tsoi.mp3", ru: "audio/ru/tsoi.mp3" },
      story: {
        fr: {
          title: "Viktor Tsoï : la musique, le cinéma et une mémoire partagée",
          paragraphs: [
            "Viktor Tsoï était un musicien, auteur-compositeur et acteur soviétique d’origine coréenne. Il est surtout connu comme le chanteur du groupe Kino, devenu une référence importante de la musique rock de la fin de l’époque soviétique. Ses chansons parlent notamment de liberté, de choix personnels et du désir de changement. Elles continuent d’être écoutées par plusieurs générations.",
            "Almaty occupe une place particulière dans la mémoire de Tsoï. La ville est associée au film Igla (L’Aiguille), sorti en 1988, dans lequel il tient le rôle principal. Certains lieux de la ville sont ainsi liés à l’histoire du cinéma et à l’image d’un artiste qui a marqué la culture populaire.",
            "Le monument de Viktor Tsoï à Almaty a été inauguré en 2018, dans la rue Tulebaïev, près de l’intersection avec la rue Kabanbaï Batyr. Il rappelle l’influence d’un artiste dont l’œuvre dépasse les frontières nationales et les différences de génération.",
            "Cette histoire montre que la culture internationale ne se limite pas aux monuments officiels ou aux relations diplomatiques. La musique et le cinéma peuvent aussi créer des liens entre les personnes, les villes et les pays. À Almaty, le souvenir de Viktor Tsoï fait partie d’une mémoire culturelle partagée par de nombreux habitants."
          ]
        },
        ru: {
          title: "Виктор Цой: музыка, кино и общая память",
          paragraphs: [
            "Виктор Цой был музыкантом, автором песен и советским актёром корейского происхождения. Наибольшую известность он получил как вокалист группы «Кино», ставшей одним из важных символов рок-музыки конца советской эпохи. В его песнях звучат темы свободы, личного выбора и стремления к переменам. Его творчество продолжают слушать представители разных поколений.",
            "Алматы занимает особое место в памяти о Цое. Город связан с фильмом «Игла», вышедшим в 1988 году, в котором он сыграл главную роль. Поэтому некоторые городские места связаны с историей кино и образом артиста, оказавшего заметное влияние на популярную культуру.",
            "Памятник Виктору Цою в Алматы был открыт в 2018 году на улице Тулебаева, недалеко от пересечения с улицей Кабанбай батыра. Он напоминает о влиянии артиста, творчество которого преодолевает государственные границы и различия между поколениями.",
            "Эта история показывает, что международные культурные связи существуют не только благодаря официальным памятникам или дипломатическим отношениям. Музыка и кино тоже способны объединять людей, города и страны. В Алматы память о Викторе Цое стала частью общей культурной памяти многих жителей."
          ]
        }
      }
    },
    {
      id: "pouchkine",
      lat: 43.2461279,
      lng: 76.9542626,
      osm: "https://www.openstreetmap.org/node/12464229134",
      cardTitle: {
        fr: "Le buste d’Alexandre Pouchkine",
        ru: "Бюст Александра Пушкина"
      },
      mapLabel: {
        fr: "Buste d’Alexandre Pouchkine",
        ru: "Бюст Александра Пушкина"
      },
      category: { fr: "Littérature russe", ru: "Русская литература" },
      address: {
        fr: "Rue Pouchkine, côté est du bâtiment du Présidium de l’Académie nationale des sciences, Almaty.",
        ru: "Улица Пушкина, восточная сторона здания Президиума Национальной академии наук, Алматы."
      },
      photo: {
        src: "images/pushkin.webp",
        position: "center 14%",
        alt: {
          fr: "Buste de bronze d’Alexandre Pouchkine sur une haute colonne de pierre, devant un bâtiment clair d’Almaty.",
          ru: "Бронзовый бюст Александра Пушкина на высоком каменном постаменте перед светлым зданием в Алматы."
        }
      },
      audio: { fr: "audio/fr/pouchkine.mp3", ru: "audio/ru/pouchkine.mp3" },
      story: {
        fr: {
          title: "Alexandre Pouchkine : la littérature russe dans le paysage culturel d’Almaty",
          paragraphs: [
            "Alexandre Pouchkine est l’un des écrivains les plus connus de la littérature russe et une figure majeure de la poésie du XIXe siècle. Ses poèmes, ses récits et ses œuvres en prose ont marqué le développement de la langue littéraire russe. Son influence a dépassé le cadre de son époque et continue d’être étudiée et lue dans de nombreux pays.",
            "Le buste de Pouchkine à Almaty a été inauguré le 29 octobre 1999, année du bicentenaire de sa naissance. Il a été réalisé par le sculpteur A. Bitchougov, avec les architectes T. Yeraliyev et A. Anchougov. Le monument se trouve dans un espace public associé au paysage culturel de la ville.",
            "La présence de ce buste rappelle le rôle de la littérature dans la transmission des idées et de la mémoire. Une œuvre littéraire peut être traduite, enseignée et interprétée par des lecteurs de langues différentes. Un monument consacré à un écrivain transforme cette mémoire littéraire en un élément visible de la ville.",
            "À Almaty, le buste de Pouchkine permet d’aborder l’histoire de la littérature russe et sa place dans le patrimoine culturel urbain. Il invite aussi à réfléchir à la manière dont les œuvres littéraires voyagent entre les générations, les langues et les sociétés."
          ]
        },
        ru: {
          title: "Александр Пушкин: русская литература в культурном пространстве Алматы",
          paragraphs: [
            "Александр Пушкин — один из самых известных писателей русской литературы и выдающийся представитель поэзии XIX века. Его стихи, поэмы и прозаические произведения оказали большое влияние на развитие русского литературного языка. Его творчество вышло за пределы своей эпохи и продолжает изучаться и читаться во многих странах.",
            "Бюст Пушкина в Алматы был открыт 29 октября 1999 года, в год двухсотлетия со дня рождения поэта. Автор скульптуры — А. Бичугов, архитекторы — Т. Ералиев и А. Анчугов. Памятник расположен в общественном пространстве, являющемся частью культурного облика города.",
            "Бюст напоминает о роли литературы в передаче идей и исторической памяти. Литературное произведение можно переводить, изучать и по-разному интерпретировать читателям, говорящим на разных языках. Памятник писателю превращает литературную память в видимую часть городской среды.",
            "В Алматы бюст Пушкина позволяет обратиться к истории русской литературы и её месту в культурном наследии города. Он также приглашает задуматься о том, как литературные произведения переходят от поколения к поколению, путешествуют между языками и объединяют разные общества."
          ]
        }
      }
    },
    {
      id: "tselinny",
      lat: 43.2484519,
      lng: 76.9291451,
      osm: "https://www.openstreetmap.org/way/27320455",
      cardTitle: {
        fr: "Le centre culturel Tselinny",
        ru: "Центр современной культуры Tselinny"
      },
      mapLabel: {
        fr: "Centre culturel Tselinny",
        ru: "Центр современной культуры Tselinny"
      },
      category: { fr: "Culture contemporaine", ru: "Современная культура" },
      address: {
        fr: "59, rue Masanchi, Almaty.",
        ru: "улица Масанчи, 59, Алматы."
      },
      photo: {
        src: "images/tselinny.webp",
        position: "center 55%",
        alt: {
          fr: "Bâtiment du centre Tselinny : une façade claire percée de petites ouvertures et une façade ondulée de lamelles verticales.",
          ru: "Здание центра Tselinny: светлый фасад с небольшими проёмами и волнистый фасад из вертикальных ламелей."
        }
      },
      audio: { fr: "audio/fr/tselinny.mp3", ru: "audio/ru/tselinny.mp3" },
      story: {
        fr: {
          title: "Tselinny : un bâtiment historique tourné vers la culture contemporaine",
          paragraphs: [
            "Tselinny est un lieu culturel d’Almaty dont l’histoire est étroitement liée à l’architecture et à la vie urbaine de l’époque soviétique. Le bâtiment a d’abord été construit comme un cinéma, en 1964. Pendant de nombreuses années, les cinémas ont constitué des espaces importants de la vie collective : les habitants s’y retrouvaient pour découvrir des films, partager des expériences et participer à la culture de leur époque.",
            "Le bâtiment historique a été transformé en centre de culture contemporaine, qui a ouvert ses portes en septembre 2025. Le projet architectural de reconstruction a été conçu par l’architecte Asif Khan. Cette transformation cherche à préserver la mémoire du lieu tout en lui donnant une nouvelle fonction adaptée aux pratiques culturelles actuelles.",
            "Tselinny représente une rencontre entre plusieurs périodes de l’histoire d’Almaty. Son passé soviétique, son architecture transformée et sa vocation contemporaine coexistent dans un même espace. Le bâtiment montre comment un lieu peut évoluer sans perdre toute trace de son histoire.",
            "Ce centre peut accueillir des projets artistiques, des rencontres et des activités culturelles qui invitent les habitants à réfléchir aux questions de société et à la création contemporaine. Il illustre une autre forme de dialogue culturel : non pas uniquement à travers un monument consacré à une personnalité étrangère, mais grâce à un espace où de nouvelles idées, des artistes et des publics peuvent se rencontrer."
          ]
        },
        ru: {
          title: "Tselinny: историческое здание, открытое современной культуре",
          paragraphs: [
            "Tselinny — культурное пространство Алматы, история которого тесно связана с архитектурой и городской жизнью советского периода. Изначально здание было построено в 1964 году как кинотеатр. На протяжении многих лет кинотеатры были важной частью общественной жизни: жители приходили туда смотреть фильмы, делиться впечатлениями и участвовать в культурной жизни своего времени.",
            "Историческое здание преобразовано в центр современной культуры, который открылся в сентябре 2025 года. Архитектурный проект реконструкции разработал архитектор Асиф Хан. Эта трансформация призвана сохранить память о месте и одновременно дать ему новую функцию, соответствующую современным культурным практикам.",
            "Tselinny объединяет несколько исторических периодов Алматы. Советское прошлое, преобразованная архитектура и современное культурное назначение сосуществуют здесь в одном пространстве. Это здание показывает, как место может меняться, не утрачивая полностью следов своей истории.",
            "В центре могут проходить художественные проекты, встречи и культурные мероприятия, которые побуждают жителей размышлять об обществе и современном творчестве. Это ещё одна форма культурного диалога: не только через памятник иностранной исторической личности, но и через пространство, где встречаются новые идеи, художники и зрители."
          ]
        }
      }
    },
    {
      id: "musee",
      lat: 43.2271753,
      lng: 76.9490333,
      osm: "https://www.openstreetmap.org/way/1348663141",
      cardTitle: {
        fr: "L’Almaty Museum of Arts",
        ru: "Almaty Museum of Arts"
      },
      mapLabel: {
        fr: "Almaty Museum of Arts",
        ru: "Almaty Museum of Arts"
      },
      category: { fr: "Art contemporain", ru: "Современное искусство" },
      address: {
        fr: "28, avenue Al-Farabi, à l’angle de l’avenue Nazarbayev, Almaty.",
        ru: "проспект Аль-Фараби, 28, пересечение с проспектом Назарбаева, Алматы."
      },
      photo: {
        src: "images/museum.webp",
        position: "center 50%",
        alt: {
          fr: "L’Almaty Museum of Arts au crépuscule : façade de pierre claire, grand escalier et sphères de pierre sur le parvis.",
          ru: "Almaty Museum of Arts в сумерках: светлый каменный фасад, широкая лестница и каменные шары на площади."
        }
      },
      audio: { fr: "audio/fr/musee.mp3", ru: "audio/ru/musee.mp3" },
      story: {
        fr: {
          title: "Almaty Museum of Arts : un espace de dialogue entre l’art kazakh et le monde",
          paragraphs: [
            "L’Almaty Museum of Arts est un musée consacré à l’art moderne et contemporain du Kazakhstan, de l’Asie centrale et d’autres régions du monde. Fondé par Nurlan Smagulov, collectionneur et mécène, il a ouvert ses portes en septembre 2025. Sa collection réunit des œuvres d’artistes kazakhs et internationaux.",
            "Le bâtiment a été conçu par le cabinet d’architecture britannique Chapman Taylor. Son architecture s’inspire du contraste entre les montagnes qui entourent Almaty et le paysage urbain de la ville. Les volumes du bâtiment, associés à la pierre calcaire et à l’aluminium, évoquent cette rencontre entre nature et environnement construit.",
            "Le musée représente une nouvelle étape dans le développement de la vie artistique d’Almaty. Il offre un espace où les œuvres locales peuvent être présentées dans un contexte international et où les visiteurs peuvent découvrir des pratiques artistiques différentes. Les expositions et les programmes culturels peuvent ainsi encourager le dialogue entre artistes, chercheurs et publics.",
            "L’art contemporain ne se limite pas à représenter une culture particulière : il peut aussi poser des questions universelles sur l’identité, la mémoire, l’environnement et les relations entre les sociétés. L’Almaty Museum of Arts montre comment une institution culturelle peut rapprocher les expériences locales et les perspectives internationales."
          ]
        },
        ru: {
          title: "Almaty Museum of Arts: пространство диалога между казахским искусством и миром",
          paragraphs: [
            "Almaty Museum of Arts — музей современного искусства Казахстана, Центральной Азии и других регионов мира. Он был основан коллекционером и меценатом Нурланом Смагуловым и открылся в сентябре 2025 года. В его коллекции представлены произведения казахстанских и зарубежных художников.",
            "Здание музея спроектировало британское архитектурное бюро Chapman Taylor. Архитектура вдохновлена контрастом между горами, окружающими Алматы, и городским ландшафтом. Объёмы здания, сочетающие известняк и алюминий, передают идею встречи природы и городской среды.",
            "Музей представляет новый этап в развитии художественной жизни Алматы. Он создаёт пространство, в котором местное искусство можно увидеть в международном контексте, а посетители могут познакомиться с разными художественными практиками. Выставки и культурные программы способны поддерживать диалог между художниками, исследователями и зрителями.",
            "Современное искусство не ограничивается изображением какой-либо одной культуры. Оно также может поднимать универсальные вопросы об идентичности, памяти, окружающей среде и отношениях между обществами. Almaty Museum of Arts показывает, как культурное учреждение может сближать местный опыт и международные взгляды."
          ]
        }
      },
      nades: {
        photo: {
          src: "images/nades.webp",
          position: "center 40%",
          alt: {
            fr: "Sculpture NADES de Jaume Plensa : tête blanche monumentale aux yeux fermés, devant l’Almaty Museum of Arts au crépuscule.",
            ru: "Скульптура NADES Жауме Пленсы: монументальная белая голова с закрытыми глазами перед Almaty Museum of Arts в сумерках."
          }
        },
        fr: {
          title: "NADES de Jaume Plensa : un visage monumental au cœur de la ville",
          paragraphs: [
            "NADES est une sculpture monumentale de l’artiste espagnol Jaume Plensa, installée à l’extérieur de l’Almaty Museum of Arts. Réalisée en 2023, l’œuvre représente le portrait d’une jeune femme aux yeux fermés. Elle mesure environ douze mètres de haut et se trouve dans l’espace public près de l’intersection des avenues Al-Farabi et Nazarbayev.",
            "Jaume Plensa est connu pour ses sculptures qui invitent à réfléchir à la figure humaine, au silence, à l’identité et à la relation entre les individus. Dans NADES, les yeux fermés peuvent évoquer un moment de calme et de concentration au milieu de l’activité urbaine. L’œuvre crée un contraste entre son échelle monumentale et l’expression paisible du visage.",
            "La sculpture fait partie des œuvres extérieures commandées pour accompagner le musée. Elle dialogue avec l’architecture contemporaine du bâtiment et avec le paysage urbain d’Almaty. Sa présence rappelle que l’art peut sortir des salles d’exposition et prendre place dans les espaces que les habitants traversent chaque jour.",
            "NADES illustre ainsi une dimension internationale de la culture contemporaine à Almaty : une œuvre créée par un artiste espagnol devient partie intégrante de l’environnement culturel d’une ville kazakhe. Elle invite les visiteurs à s’arrêter, à observer et à réfléchir à la manière dont l’art peut transformer notre perception d’un lieu."
          ]
        },
        ru: {
          title: "NADES Жауме Пленсы: монументальное лицо в центре города",
          paragraphs: [
            "NADES — монументальная скульптура испанского художника Жауме Пленсы, установленная на открытом пространстве у Almaty Museum of Arts. Произведение создано в 2023 году и представляет собой портрет молодой женщины с закрытыми глазами. Его высота составляет около двенадцати метров. Скульптура расположена в общественном пространстве рядом с пересечением проспектов Аль-Фараби и Назарбаева.",
            "Жауме Пленса известен скульптурами, которые побуждают задуматься о человеческом образе, тишине, идентичности и отношениях между людьми. В NADES закрытые глаза могут ассоциироваться с моментом спокойствия и сосредоточенности среди городской суеты. Возникает контраст между монументальным масштабом произведения и умиротворённым выражением лица.",
            "Скульптура входит в число произведений, созданных для открытых пространств музея. Она взаимодействует с современной архитектурой здания и городским ландшафтом Алматы. Её присутствие напоминает, что искусство может выходить за пределы выставочных залов и становиться частью пространства, по которому жители проходят каждый день.",
            "Таким образом, NADES показывает международное измерение современной культуры Алматы: произведение испанского художника становится частью культурной среды казахстанского города. Скульптура приглашает посетителей остановиться, внимательно посмотреть и задуматься о том, как искусство способно изменить наше восприятие места."
          ]
        }
      }
    }
  ],

  home: {
    fr: {
      title: "ALMATY SANS FRONTIÈRES",
      subtitle: "Les traces des cultures du monde dans notre ville",
      lead: "Six lieux. Plusieurs cultures. Une ville sans frontières.",
      paragraphs: [
        "Découvrez Almaty à travers six lieux qui racontent des histoires de rencontres culturelles, de mémoire, de littérature, de musique, d’architecture et d’art contemporain.",
        "Ce mini-guide vous invite à explorer les liens entre Almaty et différentes cultures du monde grâce à des récits bilingues, une carte interactive et un audioguide."
      ],
      primary: "Explorer la carte",
      secondary: "Découvrir les lieux",
      placesTitle: "Six lieux, six histoires",
      cta: "Almaty se découvre aussi en marchant. Choisissez un lieu, explorez son histoire et suivez votre propre itinéraire.",
      ctaButton: "Voir la carte"
    },
    ru: {
      title: "АЛМАТЫ БЕЗ ГРАНИЦ",
      subtitle: "Следы мировых культур на улицах нашего города",
      lead: "Шесть мест. Несколько культур. Один город без границ.",
      paragraphs: [
        "Откройте Алматы через шесть мест, рассказывающих истории культурных встреч, памяти, литературы, музыки, архитектуры и современного искусства.",
        "Этот мини-гид приглашает исследовать связи Алматы с разными культурами мира с помощью двуязычных историй, интерактивной карты и аудиогида."
      ],
      primary: "Открыть карту",
      secondary: "Познакомиться с местами",
      placesTitle: "Шесть мест — шесть историй",
      cta: "Алматы можно открывать, гуляя по городу. Выберите место, познакомьтесь с его историей и составьте собственный маршрут.",
      ctaButton: "Посмотреть карту"
    }
  },

  hero: {
    src: "images/hero.jpg",
    alt: {
      fr: "Vue d’Almaty avec le théâtre d’opéra et de ballet et les montagnes enneigées en arrière-plan.",
      ru: "Вид Алматы: театр оперы и балета и заснеженные горы на заднем плане."
    },
    credit: {
      fr: "Photo : Сергей Марцынюк, CC BY-SA 3.0, via Wikimedia Commons",
      ru: "Фото: Сергей Марцынюк, CC BY-SA 3.0, Wikimedia Commons"
    },
    creditHref: "https://commons.wikimedia.org/wiki/File:%D0%93%D0%BE%D1%81%D1%82%D0%B8%D0%BD%D0%B8%D1%86%D0%B0_%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B_-_%D0%B2%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%B3%D0%BE%D1%80%D1%8B_%D0%B8_%D1%82%D0%B5%D0%B0%D1%82%D1%80_%D0%BE%D0%BF%D0%B5%D1%80%D1%8B_%D0%B8_%D0%B1%D0%B0%D0%BB%D0%B5%D1%82%D0%B0_-_panoramio.jpg"
  },

  research: {
    fr: {
      title: "À propos du projet",
      paragraphs: [
        "Almaty sans frontières est un projet de recherche scolaire consacré aux traces des cultures du monde dans l’espace urbain d’Almaty. J’ai choisi six lieux qui permettent d’aborder différentes formes de mémoire et d’échange culturel : un monument consacré à Mahatma Gandhi, le monument de Taras Chevtchenko, le monument de Viktor Tsoï, le buste d’Alexandre Pouchkine, le centre culturel Tselinny et l’Almaty Museum of Arts.",
        "L’objectif de mon projet est de montrer comment les monuments, la littérature, la musique, l’architecture et l’art contemporain peuvent contribuer à la diversité culturelle d’une ville. En étudiant ces lieux, je cherche à comprendre comment des références venues de différents pays s’inscrivent dans le paysage d’Almaty et comment elles peuvent être découvertes par les habitants et les visiteurs.",
        "Pour réaliser ce projet, j’utilise des sources historiques et institutionnelles, je compare les informations disponibles sur les six lieux et je prépare un mini-guide touristique bilingue en français et en russe. La carte interactive doit aider les visiteurs à localiser les lieux, tandis que l’audioguide doit rendre les histoires plus accessibles.",
        "Le résultat pratique de mon projet est un guide culturel numérique qui réunit des informations historiques, une carte et des contenus bilingues. Il peut être utile aux élèves, aux habitants d’Almaty et aux visiteurs qui souhaitent découvrir la diversité culturelle de la ville."
      ],
      methodsTitle: "Méthodes de recherche",
      methods: [
        "Recherche documentaire à partir de sources historiques et institutionnelles.",
        "Comparaison des informations sur les six lieux.",
        "Organisation des contenus en français et en russe.",
        "Création d’une carte touristique interactive.",
        "Élaboration d’un audioguide bilingue."
      ],
      valueTitle: "Utilité du projet",
      value: "Le mini-guide permet de découvrir six lieux d’Almaty sous un angle culturel. Il réunit des informations bilingues, une carte interactive et un audioguide dans un seul espace numérique. Il peut servir de ressource éducative pour les élèves et de support de découverte pour les habitants et les visiteurs."
    },
    ru: {
      title: "О проекте",
      paragraphs: [
        "«Алматы без границ» — школьный исследовательский проект, посвящённый следам мировых культур в городском пространстве Алматы. Я выбрала шесть мест, которые позволяют рассмотреть разные формы культурного обмена и исторической памяти: памятник Махатме Ганди, памятник Тарасу Шевченко, памятник Виктору Цою, бюст Александра Пушкина, центр современной культуры Tselinny и Almaty Museum of Arts.",
        "Цель моего проекта — показать, как памятники, литература, музыка, архитектура и современное искусство могут вносить вклад в культурное разнообразие города. Изучая эти места, я стремлюсь понять, как культурные образы из разных стран становятся частью городского пространства Алматы и как с ними могут знакомиться жители и гости города.",
        "Для выполнения проекта я использую исторические и институциональные источники, сопоставляю доступные сведения о шести местах и создаю двуязычный туристический мини-гид на французском и русском языках. Интерактивная карта должна помогать находить достопримечательности, а аудиогид — делать их истории более доступными.",
        "Практический результат проекта — цифровой культурный гид, объединяющий историческую информацию, карту и двуязычные материалы. Он может быть полезен школьникам, жителям Алматы и туристам, которые хотят познакомиться с культурным разнообразием города."
      ],
      methodsTitle: "Методы исследования",
      methods: [
        "Изучение исторических и институциональных источников.",
        "Сопоставление информации о шести местах.",
        "Подготовка материалов на французском и русском языках.",
        "Создание интерактивной туристической карты.",
        "Подготовка двуязычного аудиогида."
      ],
      valueTitle: "Практическая значимость проекта",
      value: "Мини-гид позволяет познакомиться с шестью местами Алматы с культурной точки зрения. Он объединяет двуязычную информацию, интерактивную карту и аудиогид в одном цифровом пространстве. Он может использоваться как образовательный ресурс для школьников и как путеводитель для жителей и гостей города."
    }
  },

  sources: [
    {
      href: "https://e-history.kz/ru/kazakhstanika/show/10635",
      label: {
        fr: "Qazaqstan Tarihy — « ПАМЯТНИК ИНДИЙСКОМУ ПОЛИТИЧЕСКОМУ ДЕЯТЕЛЮ МАХАТМЕ ГАНДИ »",
        ru: "Qazaqstan Tarihy — «ПАМЯТНИК ИНДИЙСКОМУ ПОЛИТИЧЕСКОМУ ДЕЯТЕЛЮ МАХАТМЕ ГАНДИ»"
      }
    },
    {
      href: "https://e-history.kz/ru/kazakhstanika/show/10649",
      label: {
        fr: "Qazaqstan Tarihy — « ПАМЯТНИК Т. ШЕВЧЕНКО »",
        ru: "Qazaqstan Tarihy — «ПАМЯТНИК Т. ШЕВЧЕНКО»"
      }
    },
    {
      href: "https://ru.ruwiki.ru/wiki/%D0%A3%D0%BB%D0%B8%D1%86%D0%B0_%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%BE_(%D0%90%D0%BB%D0%BC%D0%B0-%D0%90%D1%82%D0%B0)",
      label: {
        fr: "Рувики — « Улица Шевченко (Алма-Ата) » (sculpteurs dirigés par Vitali Ryjik)",
        ru: "Рувики — «Улица Шевченко (Алма-Ата)» (группа скульпторов под руководством Виталия Рыжика)"
      }
    },
    {
      href: "https://e-history.kz/ru/kazakhstanika/show/10653",
      label: {
        fr: "Qazaqstan Tarihy — « ПАМЯТНИК-БЮСТ А.С. ПУШКИНУ »",
        ru: "Qazaqstan Tarihy — «ПАМЯТНИК-БЮСТ А.С. ПУШКИНУ»"
      }
    },
    {
      href: "https://e-history.kz/en/calendar/show/27727",
      label: {
        fr: "Qazaqstan Tarihy — « In 1999 a monument to the great Russian poet Pushkin was installed in Almaty »",
        ru: "Qazaqstan Tarihy — «In 1999 a monument to the great Russian poet Pushkin was installed in Almaty»"
      }
    },
    {
      href: "https://www.almaty.art/en/news/almaty-museum-of-arts-opens-on-12-september-2025",
      label: {
        fr: "Almaty Museum of Arts — page du musée sur l’ouverture",
        ru: "Almaty Museum of Arts — страница музея об открытии"
      }
    },
    {
      href: "https://www.almaty.art/visit-and-tickets",
      label: {
        fr: "Almaty Museum of Arts — adresse officielle",
        ru: "Almaty Museum of Arts — официальный адрес"
      }
    },
    {
      href: "https://www.chapmantaylor.com/projects/almaty-museum-of-art",
      label: {
        fr: "Chapman Taylor — « Almaty Museum of Arts »",
        ru: "Chapman Taylor — «Almaty Museum of Arts»"
      }
    },
    {
      href: "https://www.tselinny.org/en/building",
      label: {
        fr: "Tselinny — « Building »",
        ru: "Tselinny — «Building»"
      }
    },
    {
      href: "https://vlast.kz/english/66508-tselinny-reopens-its-doors.html",
      label: {
        fr: "Vlast — « Tselinny reopens its doors », 2025 (cinéma construit en 1964, ouverture le 5 septembre 2025)",
        ru: "Vlast — «Tselinny reopens its doors», 2025 (кинотеатр построен в 1964 году, открытие 5 сентября 2025 года)"
      }
    },
    {
      href: "https://www.zakon.kz/sobytiia/6414634-kak-izmenilsya-park-gandi-v-almaty.html",
      label: {
        fr: "Zakon.kz — « Как изменился парк Ганди в Алматы », 21 novembre 2023",
        ru: "Zakon.kz — «Как изменился парк Ганди в Алматы», 21 ноября 2023"
      }
    },
    {
      href: "https://jaumeplensa.com/works-and-projects/public-space/nades",
      label: {
        fr: "Jaume Plensa — « NADES, 2023 »",
        ru: "Жауме Пленса — «NADES, 2023»"
      }
    },
    {
      href: "https://www.zakon.kz/kultura-shoubiz/4924597-pamyatnik-viktoru-tsoyu-otkryli-v-almaty.html",
      label: {
        fr: "Zakon.kz — « Памятник Виктору Цою открыли в Алматы », 21 juin 2018",
        ru: "Zakon.kz — «Памятник Виктору Цою открыли в Алматы», 21 июня 2018"
      }
    },
    {
      href: "https://vlast.kz/kz/novosti/28430-v-almaty-ustanovili-pamatnik-viktoru-cou.html",
      label: {
        fr: "Vlast — « В Алматы установили памятник Виктору Цою », 21 juin 2018",
        ru: "Vlast — «В Алматы установили памятник Виктору Цою», 21 июня 2018"
      }
    },
    {
      href: "https://www.openstreetmap.org/node/1020229784",
      label: {
        fr: "OpenStreetMap — monument du Mahatma Gandhi, nœud 1020229784",
        ru: "OpenStreetMap — памятник Махатме Ганди, точка 1020229784"
      }
    },
    {
      href: "https://www.openstreetmap.org/node/9922628914",
      label: {
        fr: "OpenStreetMap — monument de Taras Chevtchenko, nœud 9922628914",
        ru: "OpenStreetMap — памятник Тарасу Шевченко, точка 9922628914"
      }
    },
    {
      href: "https://www.openstreetmap.org/node/9721566077",
      label: {
        fr: "OpenStreetMap — monument de Viktor Tsoï, nœud 9721566077",
        ru: "OpenStreetMap — памятник Виктору Цою, точка 9721566077"
      }
    },
    {
      href: "https://www.openstreetmap.org/node/12464229134",
      label: {
        fr: "OpenStreetMap — buste d’Alexandre Pouchkine, nœud 12464229134",
        ru: "OpenStreetMap — бюст Александра Пушкина, точка 12464229134"
      }
    },
    {
      href: "https://www.openstreetmap.org/way/27320455",
      label: {
        fr: "OpenStreetMap — Tselinny, 59 rue Masanchi, voie 27320455",
        ru: "OpenStreetMap — Tselinny, улица Масанчи, 59, линия 27320455"
      }
    },
    {
      href: "https://www.openstreetmap.org/way/1348663141",
      label: {
        fr: "OpenStreetMap — Almaty Museum of Arts, avenue Al-Farabi, voie 1348663141",
        ru: "OpenStreetMap — Almaty Museum of Arts, проспект Аль-Фараби, линия 1348663141"
      }
    },
    {
      href: "https://www.openstreetmap.org/copyright",
      label: {
        fr: "OpenStreetMap (Overpass API) — cafés, points d’eau, bancs, parcs, toilettes et arrêts du centre d’Almaty, données au 26/10/2026",
        ru: "OpenStreetMap (Overpass API) — кафе, питьевая вода, скамейки, парки, туалеты и остановки в центре Алматы, данные на 26.10.2026"
      },
      note: {
        fr: "Utilisées par la section « Confort du parcours » de la carte. © les contributeurs d’OpenStreetMap, licence ODbL.",
        ru: "Используются в разделе «Комфорт маршрута» на карте. © участники OpenStreetMap, лицензия ODbL."
      }
    }
  ],

  ui: {
    fr: {
      brand: "Almaty sans frontières",
      skip: "Aller au contenu",
      langLabel: "Langue",
      nav: [
        { id: "home", href: "index.html", label: "Accueil" },
        { id: "lieux", href: "lieux.html", label: "Les lieux" },
        { id: "carte", href: "carte.html", label: "Carte interactive" },
        { id: "audio", href: "audioguide.html", label: "Audioguide" },
        { id: "recherche", href: "recherche.html", label: "Recherche" }
      ],
      sourcesLink: "Sources",
      footerText: "Un mini-guide culturel bilingue consacré à six lieux d’Almaty et aux liens entre les cultures du monde.",
      author: "Projet réalisé par Anastasia Telyuk",
      readStory: "Lire l’histoire",
      listen: "Écouter l’histoire",
      chooseLang: "Choisir la langue :",
      readText: "Lire le texte",
      pendingAudio: "Enregistrement audio à venir. Le texte de l’histoire est disponible ci-dessous.",
      selectedFr: "Langue sélectionnée : français",
      selectedRu: "Langue sélectionnée : russe",
      address: "Adresse",
      onMap: "Voir sur la carte",
      allPlaces: "Tous les lieux",
      photoPending: "Une photographie libre de ce lieu n’est pas encore disponible.",
      photoLink: "Page de référence",
      showAll: "Afficher tous les lieux",
      listTitle: "Les six lieux",
      mapHint: "Sélectionnez un lieu dans la liste ou sur la carte, ou composez un itinéraire à pied.",
      routeTitle: "Itinéraire à pied",
      dock: {
        label: "Outils de la carte",
        route: "Itinéraire",
        comfort: "Confort",
        close: "Fermer le panneau"
      },
      routeHint: "Ajoutez au moins deux lieux, dans l’ordre de la promenade.",
      routeAdd: "Ajouter",
      routeRemove: "Retirer",
      routeClear: "Effacer l’itinéraire",
      routeNeedMore: "Ajoutez encore un lieu pour afficher le temps de marche.",
      routeDuplicate: "Ce lieu est déjà dans l’itinéraire.",
      routeLoading: "Calcul de l’itinéraire…",
      routeSummary: "Environ {time} · {distance} à pied.",
      routeNote: "Durée approximative pour une marche. Le tracé suit les rues.",
      routeNoteStraight: "Le tracé des rues n’a pas pu être chargé. La durée est une estimation à vol d’oiseau, à environ 4,5 km/h.",
      routeCredit: "Tracé © les contributeurs d’OpenStreetMap.",
      routeStep: "Étape {n} de l’itinéraire",
      comfort: {
        title: "Confort du parcours",
        hint: "Facultatif : affiche des lieux utiles dans la partie de la carte que vous regardez. Déplacez la carte pour en voir d’autres.",
        zoomIn: "Rapprochez la carte pour voir les lieux utiles du quartier.",
        zoomButton: "Rapprocher la carte",
        foundView: "{n} lieu(x) dans cette partie de la carte.",
        nearestAll: "Dans cette partie de la carte",
        nearestSome: "Les {n} plus proches du centre de la carte",
        groupLabel: "Catégories à afficher sur la carte",
        categories: {
          cafe: "Cafés",
          water: "Points d’eau",
          rest: "Espaces de repos",
          toilets: "Toilettes publiques",
          transport: "Transports"
        },
        category: {
          cafe: "Café",
          water: "Point d’eau potable",
          rest: "Espace de repos",
          toilets: "Toilettes publiques",
          transport: "Arrêt de transport"
        },
        kinds: {
          bench: "Banc",
          park: "Parc",
          bus_stop: "Arrêt de bus",
          tram_stop: "Arrêt de tramway",
          subway: "Station de métro",
          subway_entrance: "Entrée de métro"
        },
        loading: "Recherche dans OpenStreetMap…",
        waiting: "Calcul de l’itinéraire en cours…",
        none: "OpenStreetMap n’indique aucun lieu de ce type dans cette partie de la carte. Déplacez ou éloignez un peu la carte.",
        error: "Les données OpenStreetMap n’ont pas pu être chargées. Réessayez plus tard.",
        retry: "Réessayer",
        note: "Données OpenStreetMap, parfois incomplètes. Horaires, accès et état ne sont pas vérifiés.",
        noteDated: "Données OpenStreetMap au {date}, parfois incomplètes. Horaires, accès et état ne sont pas vérifiés.",
        unnamed: "Sans nom dans OpenStreetMap",
        address: "Adresse",
        noAddress: "Adresse non indiquée",
        distanceRoute: "À environ {d} de l’itinéraire",
        distancePlace: "À environ {d} de « {place} »",
        hours: "Horaires (OSM, non vérifiés)",
        hoursUnknown: "Horaires non vérifiés",
        lines: "Lignes (OSM, non vérifiées)",
        access: "Accès en fauteuil roulant (OSM, non vérifié)",
        accessValues: { yes: "oui", limited: "partiel", no: "non" },
        accessUnknown: "Accessibilité non vérifiée"
      },
      mapLabel: "Carte des six lieux",
      audioTitle: "Audioguide",
      pageTitles: {
        home: "Almaty sans frontières",
        lieux: "Les lieux — Almaty sans frontières",
        lieu: "Almaty sans frontières",
        carte: "Carte interactive — Almaty sans frontières",
        audio: "Audioguide — Almaty sans frontières",
        recherche: "Recherche — Almaty sans frontières"
      }
    },
    ru: {
      brand: "Алматы без границ",
      skip: "К содержанию",
      langLabel: "Язык",
      nav: [
        { id: "home", href: "index.html", label: "Главная" },
        { id: "lieux", href: "lieux.html", label: "Места" },
        { id: "carte", href: "carte.html", label: "Интерактивная карта" },
        { id: "audio", href: "audioguide.html", label: "Аудиогид" },
        { id: "recherche", href: "recherche.html", label: "Исследование" }
      ],
      sourcesLink: "Источники",
      footerText: "Двуязычный культурный мини-гид о шести местах Алматы и связях между культурами мира.",
      author: "Автор проекта: Анастасия Телюк",
      readStory: "Читать историю",
      listen: "Послушать историю",
      chooseLang: "Выберите язык:",
      readText: "Читать текст",
      pendingAudio: "Аудиозапись будет добавлена. Текст истории доступен ниже.",
      selectedFr: "Выбранный язык: французский",
      selectedRu: "Выбранный язык: русский",
      address: "Адрес",
      onMap: "Показать на карте",
      allPlaces: "Все места",
      photoPending: "Свободная фотография этого места пока недоступна.",
      photoLink: "Страница источника",
      showAll: "Показать все места",
      listTitle: "Шесть мест",
      mapHint: "Выберите место в списке или на карте или составьте пеший маршрут.",
      routeTitle: "Пеший маршрут",
      dock: {
        label: "Инструменты карты",
        route: "Маршрут",
        comfort: "Комфорт",
        close: "Закрыть панель"
      },
      routeHint: "Добавьте минимум два места в том порядке, в котором хотите их пройти.",
      routeAdd: "В маршрут",
      routeRemove: "Убрать",
      routeClear: "Очистить маршрут",
      routeNeedMore: "Добавьте ещё одно место, чтобы увидеть время в пути.",
      routeDuplicate: "Это место уже есть в маршруте.",
      routeLoading: "Строим маршрут…",
      routeSummary: "Около {time} · {distance} пешком.",
      routeNote: "Приблизительное время пешком. Линия идёт по улицам.",
      routeNoteStraight: "Маршрут по улицам не загрузился. Время оценено по прямой, при темпе около 4,5 км/ч.",
      routeCredit: "Линия © участники OpenStreetMap.",
      routeStep: "Шаг {n} в маршруте",
      comfort: {
        title: "Комфорт маршрута",
        hint: "Необязательно: показывает полезные места в той части карты, которую вы смотрите. Сдвиньте карту, чтобы увидеть другие.",
        zoomIn: "Приблизьте карту, чтобы увидеть полезные места района.",
        zoomButton: "Приблизить карту",
        foundView: "Мест в этой части карты: {n}.",
        nearestAll: "В этой части карты",
        nearestSome: "{n} ближайших к центру карты",
        groupLabel: "Категории для показа на карте",
        categories: {
          cafe: "Кафе",
          water: "Питьевая вода",
          rest: "Места для отдыха",
          toilets: "Общественные туалеты",
          transport: "Остановки транспорта"
        },
        category: {
          cafe: "Кафе",
          water: "Питьевая вода",
          rest: "Место для отдыха",
          toilets: "Общественный туалет",
          transport: "Остановка транспорта"
        },
        kinds: {
          bench: "Скамейка",
          park: "Парк",
          bus_stop: "Автобусная остановка",
          tram_stop: "Трамвайная остановка",
          subway: "Станция метро",
          subway_entrance: "Вход в метро"
        },
        loading: "Ищем в OpenStreetMap…",
        waiting: "Строим маршрут…",
        none: "В этой части карты OpenStreetMap не отмечает мест этого типа. Сдвиньте или немного отдалите карту.",
        error: "Не удалось загрузить данные OpenStreetMap. Попробуйте позже.",
        retry: "Повторить",
        note: "Данные OpenStreetMap могут быть неполными. Часы работы, доступность и состояние не проверены.",
        noteDated: "Данные OpenStreetMap на {date} могут быть неполными. Часы работы, доступность и состояние не проверены.",
        unnamed: "Без названия в OpenStreetMap",
        address: "Адрес",
        noAddress: "Адрес не указан",
        distanceRoute: "Примерно {d} от маршрута",
        distancePlace: "Примерно {d} от «{place}»",
        hours: "Часы работы (OSM, не проверено)",
        hoursUnknown: "Часы работы не проверены",
        lines: "Маршруты (OSM, не проверено)",
        access: "Доступ для инвалидных колясок (OSM, не проверено)",
        accessValues: { yes: "да", limited: "частично", no: "нет" },
        accessUnknown: "Доступность не проверена"
      },
      mapLabel: "Карта шести мест",
      audioTitle: "Аудиогид",
      pageTitles: {
        home: "Алматы без границ",
        lieux: "Места — Алматы без границ",
        lieu: "Алматы без границ",
        carte: "Интерактивная карта — Алматы без границ",
        audio: "Аудиогид — Алматы без границ",
        recherche: "Исследование — Алматы без границ"
      }
    }
  }
};
