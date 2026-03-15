import user1Img from "../../assets/users/user-1.jpg";
import user2Img from "../../assets/users/user-2.jpg";
import user3Img from "../../assets/users/user-3.jpg";
import user4Img from "../../assets/users/user-4.jpg";
import user5Img from "../../assets/users/user-5.jpg";
import user6Img from "../../assets/users/user-6.jpg";

export interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

export const DUMMY_USERS: UserProps[] = [
  {
    id: 'u1',
    name: 'Jasmine Washington',
    avatar: user1Img,
  },
  {
    id: 'u2',
    name: 'Emily Thompson',
    avatar: user2Img,
  },
  {
    id: 'u3',
    name: 'Marcus Johnson',
    avatar: user3Img,
  },
  {
    id: 'u4',
    name: 'David Miller',
    avatar: user4Img,
  },
  {
    id: 'u5',
    name: 'Priya Patel',
    avatar: user5Img,
  },
  {
    id: 'u6',
    name: 'Arjun Singh',
    avatar: user6Img,
  },
];