'use client';
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import axios from 'axios';
import { useParams } from 'next/navigation';

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState({});
    useEffect(() => {
            GetEnrolledCourseById();
        }, []);
        const GetEnrolledCourseById = async () => {
            const result = await axios.get('/api/enroll-course?courseId='+courseId);
            setCourseInfo(result.data);
            //console.log(courseInfo);
        }
  return (
    <div>
        <AppHeader hideSidebar={true} />
        <div className='flex gap-10'>
            <ChapterListSidebar courseInfo={courseInfo} />
            <ChapterContent courseInfo={courseInfo} refreshData={()=> GetEnrolledCourseById()} />
        </div>
    </div>
  )
}

export default Course