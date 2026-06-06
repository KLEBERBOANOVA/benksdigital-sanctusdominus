import foiPorVoce from "@/assets/product-foi-por-voce.png";
import rasoNaoServe from "@/assets/product-raso-nao-serve.png";
import criaiEmMim from "@/assets/product-criai-em-mim.png";

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
];

export const collections = Array.from(new Set(products.map((p) => p.collection)));
export const categories = Array.from(new Set(products.map((p) => p.category)));
export const audiences = Array.from(new Set(products.map((p) => p.audience)));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
