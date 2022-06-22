import { ProjectsList,EditProjects,CreateProjects,ProjectsIcon} from "./getProjects";
import { ShowProject } from "./showproject";
import { ShowUser } from "../users/showuser";
import { EditUsers } from "../users/getUsers";

export default {
    list : ProjectsList,
    show : ShowProject,
    edit : EditProjects,
    create : CreateProjects,
    icon : ProjectsIcon,
    showuser : ShowUser,
    edituser : EditUsers,
}