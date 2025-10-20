"use client"; 
import { db } from '@/src/services/db';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import React from 'react'

type Props = {}

const page = () => {
  return (
    <div>dashboard</div>
  )
}

export default page