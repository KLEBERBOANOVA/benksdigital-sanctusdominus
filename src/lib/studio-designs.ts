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

export type StudioDesign = {
  slug: string;
  name: string;
  collection: "Amor Divino" | "Homens de Fé" | "Mulheres de Fé";
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
];