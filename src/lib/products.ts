import foiPorVoce from "@/assets/product-foi-por-voce.png";
import rasoNaoServe from "@/assets/product-raso-nao-serve.png";
import criaiEmMim from "@/assets/product-criai-em-mim.png";
import euEscolhiVocesAsset from "@/assets/product-eu-escolhi-voces.png.asset.json";
import feMaiorMedoAsset from "@/assets/product-fe-maior-medo.png.asset.json";
import bomPerfumeAsset from "@/assets/product-bom-perfume.png.asset.json";

const euEscolhiVoces = euEscolhiVocesAsset.url;
const feMaiorMedo = feMaiorMedoAsset.url;
const bomPerfume = bomPerfumeAsset.url;

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: "Camiseta" | "Baby Look" | "Moletom" | "Boné";
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
];

export const collections = Array.from(new Set(products.map((p) => p.collection)));
export const categories = Array.from(new Set(products.map((p) => p.category)));
export const audiences = Array.from(new Set(products.map((p) => p.audience)));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
