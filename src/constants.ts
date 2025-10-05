import { Home, Video , File, PlusIcon, HomeIcon} from "lucide-react";

export const Constant_SideBarData = [
    {
        title:'Home',
        url:'/dashboard',
        icon:HomeIcon
    },
    {
        title:'Upcoming',
        url:'/meet',
        icon:File
    },
    {
        title:'Previous',
        url:'/meet',
        icon:File
    },
    {
        title:'Recordings',
        url:'/meet',
        icon:Video
    },{
        title:'PersonalRoom',
        url:'/meet',
        icon:PlusIcon
    }
]