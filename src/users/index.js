import { UsersList,EditUsers,CreateUsers,UserIcon} from "./getUsers";
import { ShowUser } from "./showuser";
import { EditUserLogins } from "./edittabs";


export default {
    icon : UserIcon,
    list : UsersList,
    show : ShowUser,
    edit : EditUsers,
    create : CreateUsers,
    edituserlogin : EditUserLogins,
}