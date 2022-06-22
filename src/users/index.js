import { UsersList,EditUsers,CreateUsers,UserIcon,EditBulk} from "./getUsers";
import { ShowUser } from "./showuser";
import { EditUserLogins } from "./edittabs";

export default {
    list : UsersList,
    show : ShowUser,
    edit : EditUsers,
    create : CreateUsers,
    icon : UserIcon,
    editbulk : EditBulk,
    edituserlogin : EditUserLogins,
}