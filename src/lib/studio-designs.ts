import amorMaria01 from "@/assets/studio-amor-divino-maria-01.png.asset.json";
import amorMaria02 from "@/assets/studio-amor-divino-maria-02.png.asset.json";
import amorMaria03 from "@/assets/studio-amor-divino-maria-03.png.asset.json";
import amorMaria04 from "@/assets/studio-amor-divino-maria-04.png.asset.json";
import amorMaria06 from "@/assets/studio-amor-divino-maria-06.png.asset.json";
import amorMaria07 from "@/assets/studio-amor-divino-maria-07.png.asset.json";
import carloAcutis from "@/assets/studio-homens-fe-carlo-acutis.png.asset.json";
import cavaleiroTemplario from "@/assets/studio-homens-fe-cavaleiro-templario.jpg.asset.json";
import cristoRei from "@/assets/studio-homens-fe-cristo-rei.jpg.asset.json";
import davi from "@/assets/studio-homens-fe-davi.jpg.asset.json";
import santoAgostinho from "@/assets/studio-homens-fe-santo-agostinho.jpg.asset.json";
import saoBento from "@/assets/studio-homens-fe-sao-bento.png.asset.json";
import saoFrancisco from "@/assets/studio-homens-fe-sao-francisco-assis.png.asset.json";
import saoJoaoBatista from "@/assets/studio-homens-fe-sao-joao-batista.png.asset.json";
import saoJose from "@/assets/studio-homens-fe-sao-jose.png.asset.json";
import saoMiguel from "@/assets/studio-homens-fe-sao-miguel.png.asset.json";
import aveMaria from "@/assets/studio-mulheres-fe-ave-maria.png.asset.json";
import ester from "@/assets/studio-mulheres-fe-ester.png.asset.json";
import fiat from "@/assets/studio-mulheres-fe-fiat.png.asset.json";
import filhaDoRei from "@/assets/studio-mulheres-fe-filha-do-rei.png.asset.json";
import joanaDarc from "@/assets/studio-mulheres-fe-joana-darc.png.asset.json";
import totaPulchra from "@/assets/studio-mulheres-fe-tota-pulchra.png.asset.json";
import apostolosEisCoracaoEscura from "@/assets/studio-apostolos-eis-o-coracao-escura.png.asset.json";
import apostolosEisCoracaoClara from "@/assets/studio-apostolos-eis-o-coracao-clara.png.asset.json";
import apostolosFoiPorVoce from "@/assets/studio-apostolos-foi-por-voce.png.asset.json";
import apostolosCriaiCoracao from "@/assets/studio-apostolos-criai-em-mim-um-coracao.png.asset.json";
import apostolosEncontreiJesus from "@/assets/studio-apostolos-eu-encontrei-jesus.png.asset.json";
import apostolosFeMaiorMedo from "@/assets/studio-apostolos-fe-maior-que-o-medo.png.asset.json";
import apostolosFeMedoCostas from "@/assets/studio-apostolos-fe-medo-costas.png.asset.json";
import apostolosFilipenses from "@/assets/studio-apostolos-filipenses-4-13.png.asset.json";
import apostolosOraEspera from "@/assets/studio-apostolos-ora-espera-e-confia.png.asset.json";
import apostolosSegueMe from "@/assets/studio-apostolos-segue-me.png.asset.json";
import apostolosSemFe from "@/assets/studio-apostolos-sem-fe-e-impossivel-agradar.png.asset.json";
import apostolosMaoSustentaJpg from "@/assets/studio-apostolos-a-mao-que-te-sustenta.jpg.asset.json";
import apostolosMaoSustentaPng from "@/assets/studio-apostolos-a-mao-que-te-sustenta.png.asset.json";
import apostolosAlegriaSenhor from "@/assets/studio-apostolos-a-alegria-do-senhor.png.asset.json";
import apostolosPerfumeCristo from "@/assets/studio-apostolos-perfume-de-cristo.png.asset.json";
import apostolosRecebeiPoder from "@/assets/studio-apostolos-recebei-o-poder.png.asset.json";
import apostolos2Col17b from "@/assets/studio-apostolos-2-col-17b.png.asset.json";
import apostolos2Col18 from "@/assets/studio-apostolos-2-col-18.png.asset.json";
import apostolos2Col24 from "@/assets/studio-apostolos-2-col-24.png.asset.json";
import apostolos2Col28b from "@/assets/studio-apostolos-2-col-28b.png.asset.json";
import apostolos2Chamado from "@/assets/studio-apostolos-2-chamado-nao-e-sobre.png.asset.json";
import apostolos2EscolhiVoce from "@/assets/studio-apostolos-2-eu-escolhi-voce.png.asset.json";
import apostolos2FoiPorVoce01 from "@/assets/studio-apostolos-2-foi-por-voce-01.png.asset.json";
import apostolos2FoiPorVoce from "@/assets/studio-apostolos-2-foi-por-voce.png.asset.json";
import apostolos2Raso from "@/assets/studio-apostolos-2-raso-nao-me-serve-mais.png.asset.json";
import apostolos2TudoPosso from "@/assets/studio-apostolos-2-tudo-posso-naquele.png.asset.json";
import apostolos2Coracao from "@/assets/studio-apostolos-2-estampa-coracao.png.asset.json";
import apostolos2FeMedo from "@/assets/studio-apostolos-2-fe-maior-que-o-medo.png.asset.json";
import apostolos2FeMedoOk from "@/assets/studio-apostolos-2-fe-maior-que-o-medo-ok.png.asset.json";
import apostolos2JesusKing from "@/assets/studio-apostolos-2-jesus-king.png.asset.json";
import apostolos2SaoJoao from "@/assets/studio-apostolos-2-sao-joao-batista.png.asset.json";
import apostolos2Fiat from "@/assets/studio-apostolos-2-fiat-01.png.asset.json";

export type StudioDesign = {
  slug: string;
  name: string;
  collection: "Amor Divino" | "Homens de Fé" | "Mulheres de Fé" | "Apóstolos";
  image: string;
};

export const studioDesigns: StudioDesign[] = [
  { slug: "amor-divino-maria-01", name: "Maria 01", collection: "Amor Divino", image: amorMaria01.url },
  { slug: "amor-divino-maria-02", name: "Maria 02", collection: "Amor Divino", image: amorMaria02.url },
  { slug: "amor-divino-maria-03", name: "Maria 03", collection: "Amor Divino", image: amorMaria03.url },
  { slug: "amor-divino-maria-04", name: "Maria 04", collection: "Amor Divino", image: amorMaria04.url },
  { slug: "amor-divino-maria-06", name: "Maria 06", collection: "Amor Divino", image: amorMaria06.url },
  { slug: "amor-divino-maria-07", name: "Maria 07", collection: "Amor Divino", image: amorMaria07.url },
  { slug: "homens-fe-carlo-acutis", name: "Carlo Acutis", collection: "Homens de Fé", image: carloAcutis.url },
  { slug: "homens-fe-cavaleiro-templario", name: "Cavaleiro Templário", collection: "Homens de Fé", image: cavaleiroTemplario.url },
  { slug: "homens-fe-cristo-rei", name: "Cristo Rei", collection: "Homens de Fé", image: cristoRei.url },
  { slug: "homens-fe-davi", name: "Davi", collection: "Homens de Fé", image: davi.url },
  { slug: "homens-fe-santo-agostinho", name: "Santo Agostinho", collection: "Homens de Fé", image: santoAgostinho.url },
  { slug: "homens-fe-sao-bento", name: "São Bento", collection: "Homens de Fé", image: saoBento.url },
  { slug: "homens-fe-sao-francisco-assis", name: "São Francisco de Assis", collection: "Homens de Fé", image: saoFrancisco.url },
  { slug: "homens-fe-sao-joao-batista", name: "São João Batista", collection: "Homens de Fé", image: saoJoaoBatista.url },
  { slug: "homens-fe-sao-jose", name: "São José", collection: "Homens de Fé", image: saoJose.url },
  { slug: "homens-fe-sao-miguel", name: "São Miguel", collection: "Homens de Fé", image: saoMiguel.url },
  { slug: "mulheres-fe-ave-maria", name: "Ave Maria", collection: "Mulheres de Fé", image: aveMaria.url },
  { slug: "mulheres-fe-ester", name: "Ester", collection: "Mulheres de Fé", image: ester.url },
  { slug: "mulheres-fe-fiat", name: "Fiat", collection: "Mulheres de Fé", image: fiat.url },
  { slug: "mulheres-fe-filha-do-rei", name: "Filha do Rei", collection: "Mulheres de Fé", image: filhaDoRei.url },
  { slug: "mulheres-fe-joana-darc", name: "Joana d’Arc", collection: "Mulheres de Fé", image: joanaDarc.url },
  { slug: "mulheres-fe-tota-pulchra", name: "Tota Pulchra", collection: "Mulheres de Fé", image: totaPulchra.url },
  { slug: "apostolos-eis-o-coracao-escura", name: "Eis o Coração — Cores Escuras", collection: "Apóstolos", image: apostolosEisCoracaoEscura.url },
  { slug: "apostolos-eis-o-coracao-clara", name: "Eis o Coração — Cores Claras", collection: "Apóstolos", image: apostolosEisCoracaoClara.url },
  { slug: "apostolos-foi-por-voce", name: "Foi por Você", collection: "Apóstolos", image: apostolosFoiPorVoce.url },
  { slug: "apostolos-criai-em-mim-um-coracao", name: "Criai em Mim um Coração", collection: "Apóstolos", image: apostolosCriaiCoracao.url },
  { slug: "apostolos-eu-encontrei-jesus", name: "Eu Encontrei Jesus", collection: "Apóstolos", image: apostolosEncontreiJesus.url },
  { slug: "apostolos-fe-maior-que-o-medo", name: "Fé Maior que o Medo", collection: "Apóstolos", image: apostolosFeMaiorMedo.url },
  { slug: "apostolos-fe-medo-costas", name: "Fé Maior que o Medo — Costas", collection: "Apóstolos", image: apostolosFeMedoCostas.url },
  { slug: "apostolos-filipenses-4-13", name: "Filipenses 4,13", collection: "Apóstolos", image: apostolosFilipenses.url },
  { slug: "apostolos-ora-espera-e-confia", name: "Ora, Espera e Confia", collection: "Apóstolos", image: apostolosOraEspera.url },
  { slug: "apostolos-segue-me", name: "Segue-me", collection: "Apóstolos", image: apostolosSegueMe.url },
  { slug: "apostolos-sem-fe-e-impossivel-agradar", name: "Sem Fé é Impossível Agradar", collection: "Apóstolos", image: apostolosSemFe.url },
  { slug: "apostolos-a-mao-que-te-sustenta-jpg", name: "A Mão que te Sustenta 01", collection: "Apóstolos", image: apostolosMaoSustentaJpg.url },
  { slug: "apostolos-a-mao-que-te-sustenta-png", name: "A Mão que te Sustenta 02", collection: "Apóstolos", image: apostolosMaoSustentaPng.url },
  { slug: "apostolos-a-alegria-do-senhor", name: "A Alegria do Senhor", collection: "Apóstolos", image: apostolosAlegriaSenhor.url },
  { slug: "apostolos-perfume-de-cristo", name: "Perfume de Cristo", collection: "Apóstolos", image: apostolosPerfumeCristo.url },
  { slug: "apostolos-recebei-o-poder", name: "Recebei o Poder", collection: "Apóstolos", image: apostolosRecebeiPoder.url },
  { slug: "apostolos-2-col-17b", name: "Coleção 17B", collection: "Apóstolos", image: apostolos2Col17b.url },
  { slug: "apostolos-2-col-18", name: "Coleção 18", collection: "Apóstolos", image: apostolos2Col18.url },
  { slug: "apostolos-2-col-24", name: "Coleção 24", collection: "Apóstolos", image: apostolos2Col24.url },
  { slug: "apostolos-2-col-28b", name: "Coleção 28B", collection: "Apóstolos", image: apostolos2Col28b.url },
  { slug: "apostolos-2-chamado-nao-e-sobre", name: "Chamado Não é Sobre", collection: "Apóstolos", image: apostolos2Chamado.url },
  { slug: "apostolos-2-eu-escolhi-voce", name: "Eu Escolhi Você", collection: "Apóstolos", image: apostolos2EscolhiVoce.url },
  { slug: "apostolos-2-foi-por-voce-01", name: "Foi por Você 01", collection: "Apóstolos", image: apostolos2FoiPorVoce01.url },
  { slug: "apostolos-2-foi-por-voce", name: "Foi por Você 02", collection: "Apóstolos", image: apostolos2FoiPorVoce.url },
  { slug: "apostolos-2-raso-nao-me-serve-mais", name: "O Raso Não Me Serve Mais", collection: "Apóstolos", image: apostolos2Raso.url },
  { slug: "apostolos-2-tudo-posso-naquele", name: "Tudo Posso Naquele", collection: "Apóstolos", image: apostolos2TudoPosso.url },
  { slug: "apostolos-2-estampa-coracao", name: "Estampa Coração", collection: "Apóstolos", image: apostolos2Coracao.url },
  { slug: "apostolos-2-fe-maior-que-o-medo", name: "Fé Maior que o Medo 02", collection: "Apóstolos", image: apostolos2FeMedo.url },
  { slug: "apostolos-2-fe-maior-que-o-medo-ok", name: "Fé Maior que o Medo 03", collection: "Apóstolos", image: apostolos2FeMedoOk.url },
  { slug: "apostolos-2-jesus-king", name: "Jesus King", collection: "Apóstolos", image: apostolos2JesusKing.url },
  { slug: "apostolos-2-sao-joao-batista", name: "São João Batista", collection: "Apóstolos", image: apostolos2SaoJoao.url },
  { slug: "apostolos-2-fiat-01", name: "Fiat 01", collection: "Apóstolos", image: apostolos2Fiat.url },
];