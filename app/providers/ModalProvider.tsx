'use client';

import LoginModal from "@/app/components/Modal/LoginModal";
import RegisterModal from "@/app/components/Modal/RegisterModal";
import RentModal from "@/app/components/Modal/RentModal";
import SearchModal from "@/app/components/Modal/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;