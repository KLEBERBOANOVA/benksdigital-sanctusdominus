import foiPorVoce from "@/assets/product-foi-por-voce.png";
import rasoNaoServe from "@/assets/product-raso-nao-serve.png";
import criaiEmMim from "@/assets/product-criai-em-mim.png";
import euEscolhiVocesAsset from "@/assets/product-eu-escolhi-voces.png.asset.json";
import feMaiorMedoAsset from "@/assets/product-fe-maior-medo.png.asset.json";
import bomPerfumeAsset from "@/assets/product-bom-perfume.png.asset.json";
import naoFoiVocesAsset from "@/assets/product-nao-foi-voces.png.asset.json";
import poderEspiritoAsset from "@/assets/product-poder-espirito-santo.png.asset.json";
import mariaPassaFrenteAsset from "@/assets/product-maria-passa-frente.png.asset.json";
import santaTerezinhaFofaAsset from "@/assets/product-santa-terezinha-fofa.png.asset.json";
import santaTerezinhaAsset from "@/assets/product-santa-terezinha.png.asset.json";
import fiatAsset from "@/assets/product-fiat.png.asset.json";
import tudoPossoAsset from "@/assets/product-tudo-posso.png.asset.json";
import feInabalavelAsset from "@/assets/product-fe-inabalavel.png.asset.json";
import eleViveAsset from "@/assets/product-ele-vive.png.asset.json";
import virgemMariaMantoAsset from "@/assets/product-virgem-maria-manto.png.asset.json";
import virgemMariaFeAsset from "@/assets/product-virgem-maria-fe.png.asset.json";
import sanctusBordoVinhoAsset from "@/assets/product-sanctus-bordo-vinho.png.asset.json";
import eisCoracaoMarromAsset from "@/assets/product-eis-coracao-marrom.png.asset.json";
import daimeCoracaoPretoAsset from "@/assets/product-daime-coracao-preto.png.asset.json";
import daimeCoracaoBegeAsset from "@/assets/product-daime-coracao-bege.png.asset.json";
import padrePioPretaAsset from "@/assets/product-padre-pio-preta.png.asset.json";
import jesusCaminhoPretaAsset from "@/assets/product-jesus-caminho-preta.png.asset.json";
import euNaoSouPretaAsset from "@/assets/product-eu-nao-sou-preta.png.asset.json";
import buscaiAoSenhorAsset from "@/assets/product-buscai-ao-senhor.png.asset.json";
import saoJoaoBatistaAsset from "@/assets/product-sao-joao-batista.png.asset.json";
import jesusMeuSenhorAsset from "@/assets/product-jesus-meu-senhor.png.asset.json";
import feMaiorQueOMedoOffwhiteAsset from "@/assets/product-fe-maior-que-o-medo-offwhite.png.asset.json";
import euEncontreiJesusBrancaAsset from "@/assets/product-eu-encontrei-jesus-branca.png.asset.json";
import euEncontreiJesusRoxaAsset from "@/assets/product-eu-encontrei-jesus-roxa.png.asset.json";
import euEscolhiVocesOversizeAsset from "@/assets/product-eu-escolhi-voces-oversize.png.asset.json";

const euEscolhiVoces = euEscolhiVocesAsset.url;
const feMaiorMedo = feMaiorMedoAsset.url;
const bomPerfume = bomPerfumeAsset.url;
const naoFoiVoces = naoFoiVocesAsset.url;
const poderEspirito = poderEspiritoAsset.url;
const mariaPassaFrente = mariaPassaFrenteAsset.url;
const santaTerezinhaFofa = santaTerezinhaFofaAsset.url;
const santaTerezinha = santaTerezinhaAsset.url;
const fiat = fiatAsset.url;
const tudoPosso = tudoPossoAsset.url;
const feInabalavel = feInabalavelAsset.url;
const eleVive = eleViveAsset.url;
const virgemMariaManto = virgemMariaMantoAsset.url;
const virgemMariaFe = virgemMariaFeAsset.url;
const sanctusBordoVinho = sanctusBordoVinhoAsset.url;
const eisCoracaoMarrom = eisCoracaoMarromAsset.url;
const daimeCoracaoPreto = daimeCoracaoPretoAsset.url;
const daimeCoracaoBege = daimeCoracaoBegeAsset.url;
const padrePioPreta = padrePioPretaAsset.url;
const jesusCaminhoPreta = jesusCaminhoPretaAsset.url;
const euNaoSouPreta = euNaoSouPretaAsset.url;
const buscaiAoSenhor = buscaiAoSenhorAsset.url;
const saoJoaoBatista = saoJoaoBatistaAsset.url;
const jesusMeuSenhor = jesusMeuSenhorAsset.url;
const feMaiorQueOMedoOffwhite = feMaiorQueOMedoOffwhiteAsset.url;
const euEncontreiJesusBranca = euEncontreiJesusBrancaAsset.url;
const euEncontreiJesusRoxa = euEncontreiJesusRoxaAsset.url;
const euEscolhiVocesOversize = euEscolhiVocesOversizeAsset.url;

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: "Camiseta" | "Baby Look" | "Moletom" | "Boné" | "Oversize" | "Plus size";
  audience: "Masculino" | "Feminino" | "Unissex" | "Infantil";
  color: string;
  price: string;
  image: string;
  tagline: string;
  description: string;
  inspiration: string;
};

export const products: Product[] = [
  {
    slug: "eu-escolhi-voces-oversize-masculina",
    name: "Eu Escolhi Vocês — Oversize",
    collection: "Homens de Fé",
    category: "Oversize",
    audience: "Masculino",
    color: "Off-White",
    price: "R$ 89,90",
    image: euEscolhiVocesOversize,
    tagline: "João 15,16 — A escolha foi d'Ele.",
    description:
      "Camiseta masculina oversize em off-white, com modelagem ampla e estampa exclusiva inspirada em João 15,16.",
    inspiration:
      "‘Não foram vocês que me escolheram, Eu escolhi vocês.’ Uma peça para homens que vivem a fé com presença, propósito e identidade.",
  },
  {
    slug: "foi-por-voce",
    name: "Foi Por Você",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Azul Marinho",
    price: "R$ 89,90",
    image: foiPorVoce,
    tagline: "Cristo se entregou. Por você.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado, com estampa exclusiva inspirada no sacrifício de Cristo. Mãos estendidas que se encontram — a Sua e a sua.",
    inspiration:
      "A estampa retrata o instante eterno em que o Senhor estende a mão e nos chama pelo nome. Lembrete diário de que tudo foi feito por você.",
  },
  {
    slug: "criai-em-mim-um-coracao-puro",
    name: "Criai em Mim um Coração",
    collection: "Salmos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: criaiEmMim,
    tagline: "Salmo 51 — Que seja puro.",
    description:
      "Baby look algodão penteado, modelagem feminina acinturada. Estampa exclusiva com coração anatômico e tipografia clássica.",
    inspiration:
      "Inspirada no Salmo 51, o salmo penitencial de Davi. Carregue no peito o pedido mais íntimo: um coração novo, puro e fiel.",
  },
  {
    slug: "o-raso-nao-me-serve-mais",
    name: "O Raso Não Me Serve Mais",
    collection: "Conversão",
    category: "Camiseta",
    audience: "Masculino",
    color: "Bordô Vinho",
    price: "R$ 89,90",
    image: rasoNaoServe,
    tagline: "Quem provou do profundo, não volta.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em bordô vinho. Estampa de coração mergulhando em águas profundas — manifesto para quem busca mais.",
    inspiration:
      "Para a alma que já não se contenta com o superficial. Um chamado ao profundo, ao verdadeiro, ao eterno.",
  },
  {
    slug: "eu-escolhi-voces",
    name: "Eu Escolhi Vocês",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Azul Petróleo",
    price: "R$ 89,90",
    image: euEscolhiVoces,
    tagline: "João 15,16 — A escolha foi d'Ele.",
    description:
      "Baby look 100% algodão penteado, modelagem feminina. Estampa exclusiva com a face de Cristo coroado e a passagem de João 15,16.",
    inspiration:
      "‘Não foram vocês que me escolheram, Eu escolhi vocês.’ Um lembrete de que somos chamados pelo próprio Cristo — escolhidos, enviados, amados.",
  },
  {
    slug: "fe-maior-que-o-medo",
    name: "Fé Maior que o Medo",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Azul Marinho",
    price: "R$ 89,90",
    image: feMaiorMedo,
    tagline: "O Leão e o Cordeiro habitam em quem crê.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em azul marinho. Estampa exclusiva com o Leão de Judá e o Cordeiro de Deus diante da Cruz.",
    inspiration:
      "A força do Leão e a mansidão do Cordeiro. Para o apóstolo dos tempos modernos — aquele que vive pela fé, não pelo medo.",
  },
  {
    slug: "somos-o-bom-perfume-de-cristo",
    name: "Somos o Bom Perfume de Cristo",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Infantil",
    color: "Bege",
    price: "R$ 69,90",
    image: bomPerfume,
    tagline: "2 Coríntios 2,15 — Exalar Cristo por onde passar.",
    description:
      "Camiseta infantil 100% algodão penteado em bege. Estampa exclusiva com o brasão Sanctus Dominus à frente e o ‘Bom Perfume de Cristo’ nas costas.",
    inspiration:
      "Inspirada em 2 Coríntios 2,15. Para que os pequenos apóstolos cresçam exalando amor, perdão, salvação e graça por onde passarem.",
  },
  {
    slug: "nao-foi-voces-que-me-escolheram",
    name: "Não Foi Vocês que Me Escolheram",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Verde Militar",
    price: "R$ 89,90",
    image: naoFoiVoces,
    tagline: "João 15,16 — Eu escolhi vocês.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em verde militar. Brasão Sanctus Dominus à frente e a face de Cristo coroado nas costas, com a passagem de João 15,16.",
    inspiration:
      "‘Não foram vocês que me escolheram, Eu escolhi vocês.’ Um manifesto silencioso para apóstolos modernos — chamados, escolhidos, enviados.",
  },
  {
    slug: "recebereis-o-poder-do-espirito-santo",
    name: "Recebereis o Poder do Espírito Santo",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: poderEspirito,
    tagline: "Atos 1,8 — O fogo do Espírito.",
    description:
      "Baby look 100% algodão penteado em off-white, modelagem feminina. Brasão Sanctus Dominus à frente; nas costas, a pomba envolta em chamas e a promessa de Atos 1,8.",
    inspiration:
      "Pentecostes vivo. Para a apóstola que carrega o fogo do Espírito em cada gesto, palavra e missão do dia a dia.",
  },
  {
    slug: "maria-passa-a-frente",
    name: "Maria Passa à Frente",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Azul Marinho",
    price: "R$ 89,90",
    image: mariaPassaFrente,
    tagline: "Aos pés da Mãe — sempre.",
    description:
      "Baby look 100% algodão penteado em azul marinho, modelagem feminina. Estampa exclusiva de Nossa Senhora em oração à frente e brasão Sanctus Dominus nas costas.",
    inspiration:
      "Quando a vida parece pesada, Maria passa à frente. Uma peça-oração para quem confia tudo às mãos da Mãe.",
  },
  {
    slug: "santa-terezinha-do-menino-jesus-ilustrada",
    name: "Santa Terezinha do Menino Jesus",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Areia",
    price: "R$ 89,90",
    image: santaTerezinhaFofa,
    tagline: "Do pequeno caminho nasce a santidade.",
    description:
      "Baby look em tom areia com ilustração delicada de Santa Terezinha do Menino Jesus e assinatura Sanctus Dominus nas costas.",
    inspiration:
      "Inspirada na pequena via de Santa Terezinha: amor nas pequenas coisas, confiança total em Deus e doçura como testemunho.",
  },
  {
    slug: "santa-terezinha-do-menino-jesus",
    name: "Santa Terezinha do Menino Jesus Classic",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Areia",
    price: "R$ 89,90",
    image: santaTerezinha,
    tagline: "Flores, entrega e pequeno caminho.",
    description:
      "Baby look em tom areia com arte clássica de Santa Terezinha do Menino Jesus à frente e assinatura discreta da marca nas costas.",
    inspiration:
      "Uma peça devocional inspirada na santa das rosas, feita para quem deseja vestir ternura, entrega e vida interior.",
  },
  {
    slug: "fiat-sua-vontade-seja-feita",
    name: "FIAT — Sua Vontade Seja Feita",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Branco Gelo",
    price: "R$ 89,90",
    image: fiat,
    tagline: "O sim que transforma tudo.",
    description:
      "Baby look branca com cruz dourada radiante e a mensagem 'FIAT — Sua vontade seja feita', com assinatura Sanctus Dominus nas costas.",
    inspiration:
      "Inspirada no sim de Maria, esta peça traduz obediência, confiança e disponibilidade total à vontade de Deus.",
  },
  {
    slug: "tudo-posso-naquele-que-me-fortalece",
    name: "Tudo Posso Naquele que Me Fortalece",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: tudoPosso,
    tagline: "Filipenses 4,13 — força que vem do Alto.",
    description:
      "Baby look off-white com assinatura Sanctus Dominus à frente e estampa impactante nas costas com a mensagem 'Tudo posso naquele que me fortalece'.",
    inspiration:
      "Uma peça para lembrar diariamente que a força do cristão vem de Cristo, mesmo nos dias mais difíceis.",
  },
  {
    slug: "fe-inabalavel-nossa-senhora-aparecida",
    name: "Fé Inabalável — N. Sra. Aparecida",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Branco",
    price: "R$ 89,90",
    image: feInabalavel,
    tagline: "Ela nunca falha.",
    description:
      "Baby look branca com assinatura Sanctus Dominus à frente e arte exclusiva de Nossa Senhora Aparecida em azul e dourado nas costas.",
    inspiration:
      "Pensada para devotas que carregam no peito a confiança filial na intercessão da Mãe Aparecida.",
  },
  {
    slug: "ele-vive",
    name: "Ele Vive",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: eleVive,
    tagline: "Cristo ressuscitado vive em nós.",
    description:
      "Baby look off-white com ilustração dourada de Cristo e a mensagem 'Ele Vive' em composição frontal elegante.",
    inspiration:
      "Uma peça-testemunho para anunciar com beleza a vitória da ressurreição e a presença viva de Jesus.",
  },
  {
    slug: "virgem-maria-sob-o-teu-manto",
    name: "Virgem Maria — Sob o Teu Manto",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: virgemMariaManto,
    tagline: "Mãe de Jesus, rogai por nós.",
    description:
      "Baby look off-white com assinatura frontal Sanctus Dominus e arte devocional nas costas dedicada à Virgem Maria, com a frase 'Sob o teu manto, não há alma que se perca'.",
    inspiration:
      "Inspirada na proteção maternal de Maria para mulheres que desejam vestir fé, ternura e intercessão.",
  },
  {
    slug: "virgem-maria-nada-e-impossivel",
    name: "Virgem Maria — Nada é Impossível",
    collection: "Apóstolos",
    category: "Baby Look",
    audience: "Feminino",
    color: "Off-White",
    price: "R$ 89,90",
    image: virgemMariaFe,
    tagline: "Lucas 1,37 — para quem tem fé.",
    description:
      "Baby look off-white com composição frontal mariana em azul e dourado e a mensagem 'Nada é impossível para aquele que tem fé'.",
    inspiration:
      "Uma criação voltada para quem deseja carregar no vestuário a esperança e a confiança no impossível de Deus.",
  },
  {
    slug: "sanctus-dominus-bordo-vinho",
    name: "Sanctus Dominus Bordô Vinho",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Bordô Vinho",
    price: "R$ 89,90",
    image: sanctusBordoVinho,
    tagline: "Minimalismo com identidade cristã.",
    description:
      "Camiseta masculina bordô vinho com assinatura Sanctus Dominus centralizada no peito e brasão discreto nas costas.",
    inspiration:
      "Para quem prefere uma estética mais sóbria, elegante e versátil sem abrir mão da identidade da marca e da fé.",
  },
  {
    slug: "eis-o-coracao-que-tanto-amou",
    name: "Eis o Coração que Tanto Amou",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Marrom",
    price: "R$ 89,90",
    image: eisCoracaoMarrom,
    tagline: "‘Não poupou nada’ — Sagrado Coração.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em marrom. Assinatura Sanctus Dominus à frente e estampa flamejante do Sagrado Coração nas costas com a frase ‘Eis o Coração que tanto amou os homens, que não poupou nada’.",
    inspiration:
      "Inspirada na revelação do Sagrado Coração de Jesus a Santa Margarida Maria — um manifesto do amor que se entrega sem reservas.",
  },
  {
    slug: "dai-me-um-coracao-semelhante-ao-teu-preto",
    name: "Dai-me um Coração Semelhante ao Teu — Preto",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Preto",
    price: "R$ 89,90",
    image: daimeCoracaoPreto,
    tagline: "Oração de transformação interior.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em preto. Assinatura Sanctus Dominus à frente e arte tatuada do coração com faixa nas costas: ‘Dai-me um coração semelhante ao Teu’.",
    inspiration:
      "Para quem deseja que o próprio coração seja moldado segundo o Coração de Cristo — manso, humilde e ardente em amor.",
  },
  {
    slug: "dai-me-um-coracao-semelhante-ao-teu-bege",
    name: "Dai-me um Coração Semelhante ao Teu — Bege",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Bege",
    price: "R$ 89,90",
    image: daimeCoracaoBege,
    tagline: "Versão clara da oração que transforma.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em bege. Assinatura Sanctus Dominus à frente e arte vibrante do coração com faixa nas costas: ‘Dai-me um coração semelhante ao Teu’.",
    inspiration:
      "A mesma oração de conversão em uma versão luminosa — para vestir leveza, fé e o desejo de um coração novo.",
  },
  {
    slug: "padre-pio-reze-espere-e-nao-se-preocupe",
    name: "Padre Pio — Reze, Espere e Não se Preocupe",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Preto",
    price: "R$ 89,90",
    image: padrePioPreta,
    tagline: "A preocupação é inútil. Deus é misericordioso.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em preto. Assinatura Sanctus Dominus à frente e composição exclusiva de São Padre Pio nas costas com sua mensagem mais conhecida de confiança em Deus.",
    inspiration:
      "Inspirada na espiritualidade de Padre Pio, feita para quem deseja vestir abandono, oração perseverante e confiança total na misericórdia divina.",
  },
  {
    slug: "jesus-cristo-e-o-caminho-a-verdade-e-a-vida",
    name: "Jesus Cristo é o Caminho, a Verdade e a Vida",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Preto",
    price: "R$ 89,90",
    image: jesusCaminhoPreta,
    tagline: "João 14,6 — Ele transforma vidas.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em preto. Frente minimalista com assinatura Sanctus Dominus e estampa marcante nas costas com Cristo, cruz e a declaração ‘o Caminho, a Verdade e a Vida’.",
    inspiration:
      "Uma peça-manifesto centrada em João 14,6 para lembrar, em todo ambiente, que Cristo é o único caminho e permanece o mesmo hoje, amanhã e para sempre.",
  },
  {
    slug: "eu-nao-sou-deste-mundo-mas-meu-rei-e-soberano",
    name: "Eu Não Sou Deste Mundo, mas Meu Rei é Soberano",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Preto",
    price: "R$ 89,90",
    image: euNaoSouPreta,
    tagline: "João 18,36 — Meu Reino não é deste mundo.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em preto. Assinatura Sanctus Dominus à frente e arte impactante nas costas com cruz, leão e a mensagem ‘Eu não sou deste mundo, mas meu Rei é soberano’.",
    inspiration:
      "Inspirada na realeza de Cristo e no desprendimento do espírito do mundo, para homens que desejam vestir identidade, coragem e pertencimento ao Reino eterno.",
  },
  {
    slug: "buscai-ao-senhor",
    name: "Buscai ao Senhor",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Branco",
    price: "R$ 89,90",
    image: buscaiAoSenhor,
    tagline: "Isaías 55,6 — enquanto se pode achar.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em branco. Assinatura Sanctus Dominus à frente e estampa exclusiva nas costas com a porta aberta da graça e o chamado profético de Isaías 55,6.",
    inspiration:
      "Inspirada no convite urgente de Isaías: buscar o Senhor enquanto Ele se deixa encontrar e invocá-Lo enquanto está perto.",
  },
  {
    slug: "sao-joao-batista",
    name: "São João Batista — Ecce Agnus Dei",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Marrom",
    price: "R$ 89,90",
    image: saoJoaoBatista,
    tagline: "Eis o Cordeiro de Deus. Rogai por nós!",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em marrom. Estampa exclusiva à frente de São João Batista apontando para o Cordeiro, com assinatura Sanctus Dominus nas costas.",
    inspiration:
      "Inspirada no precursor de Cristo, voz que clama no deserto e aponta para o Cordeiro de Deus — coragem profética para os dias de hoje.",
  },
  {
    slug: "jesus-meu-senhor-e-salvador",
    name: "Jesus, meu Senhor e Salvador",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Azul Marinho",
    price: "R$ 89,90",
    image: jesusMeuSenhor,
    tagline: "Cristo crucificado, esperança que ressuscita.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em azul marinho. Estampa exclusiva à frente de Cristo crucificado em composição radiante, com assinatura Sanctus Dominus nas costas.",
    inspiration:
      "Inspirada na confissão de fé que reconhece Jesus como Senhor e Salvador — a Cruz como trono e a Ressurreição como vitória definitiva.",
  },
  {
    slug: "fe-maior-que-o-medo-offwhite",
    name: "Fé Maior que o Medo — Off-White",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Off-White",
    price: "R$ 89,90",
    image: feMaiorQueOMedoOffwhite,
    tagline: "2 Timóteo 1,7 — a fé vence o medo.",
    description:
      "Camiseta 100% algodão fio 30.1 penteado em off-white. Frente com assinatura Sanctus Dominus e arte exclusiva nas costas com cruz luminosa e a declaração 'Fé maior que o medo'.",
    inspiration:
      "Inspirada em 2 Timóteo 1,7, para lembrar que Deus não nos deu um espírito de covardia, mas de fortaleza, amor e moderação.",
  },
  {
    slug: "eu-encontrei-jesus",
    name: "Eu Encontrei Jesus",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Infantil",
    color: "Branco",
    price: "R$ 69,90",
    image: euEncontreiJesusBranca,
    tagline: "Atos 22,9 — encontro que muda tudo.",
    description:
      "Camiseta infantil 100% algodão penteado em branco. Frente com assinatura Sanctus Dominus e estampa colorida exclusiva nas costas com a mensagem 'Eu encontrei Jesus'.",
    inspiration:
      "Inspirada no encontro transformador com Cristo, feita para vestir os pequenos apóstolos com alegria, cor e identidade de fé.",
  },
  {
    slug: "eu-encontrei-jesus-adulto-roxa",
    name: "Eu Encontrei Jesus — Adulto Roxa",
    collection: "Apóstolos",
    category: "Camiseta",
    audience: "Masculino",
    color: "Roxo",
    price: "R$ 89,90",
    image: euEncontreiJesusRoxa,
    tagline: "Atos 22,9 — encontro que muda tudo.",
    description:
      "Camiseta adulto 100% algodão fio 30.1 penteado em roxo. Frente com assinatura Sanctus Dominus e estampa colorida exclusiva nas costas com a mensagem 'Eu encontrei Jesus'.",
    inspiration:
      "Inspirada no encontro transformador com Cristo — uma peça vibrante para anunciar com cor e ousadia a alegria de quem encontrou o Senhor.",
  },
];

export const collections = Array.from(new Set(products.map((p) => p.collection)));
export const categories = Array.from(new Set(products.map((p) => p.category)));
export const audiences = Array.from(new Set(products.map((p) => p.audience)));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
