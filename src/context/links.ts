import { IconType } from "react-icons"
import { BsPersonFill, BsFillFileEarmarkPdfFill, BsWhatsapp } from "react-icons/bs";
import { MdSettings, MdDashboard } from "react-icons/md";
import { CgScreen } from "react-icons/cg";

type Link = {
    icon: IconType,
    name: string,
    path: string
}

export const screensLinkData: Link[] = [
    {
        icon: MdDashboard,
        name: "Kontrol Paneli",
        path: "/kontrol paneli"
    },
    {
        icon: BsPersonFill,
        name: "Müşterilerim",
        path: "/müşterilerim"
    },
    {
        icon: BsFillFileEarmarkPdfFill,
        name: "Poliçelerim",
        path: "/poliçelerim",
    },
    {
        icon: MdSettings,
        name: "Ayarlar",
        path: "/ayarlar"
    }
];

export const externalSourcesLinksData: Link[] = [
    {
        icon: BsWhatsapp,
        name: "Whatsapp",
        path: "/whatsapp"
    },
    {
        icon: CgScreen,
        name: "Web2c",
        path: "/web2c"
    },
];

