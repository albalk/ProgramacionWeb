"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Comment from "@/components/Comment"
import ComerceInfo from '@/components/ComerceInfo';

async function UserComerce() {

    return (
        <div>
            <ComerceInfo />
            <Comment />
        </div>
    )
  
}
  
export default UserComerce