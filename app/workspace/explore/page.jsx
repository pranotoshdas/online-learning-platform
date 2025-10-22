'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { Skeleton } from '@/components/ui/skeleton'

function ExploreCourses() {
    const [courseList, setCourseList] = useState([]);
    const { user } = useUser();
    useEffect(() => {
        user && GetCourseList();
    }, [user]);
    const GetCourseList = async () => {
        // Fetch course list from API
        const result = await axios.get('/api/courses?courseId=0');
        setCourseList(result.data);
        console.log("Course List:", result.data);
    }
  return (
    <div>
        <h2 className='font-bold text-3xl mb-6'>Explore More Courses</h2>
        <div className='flex gap-5 max-w-md'>
            <Input placeholder="Search" />
            <Button><Search /> Search</Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {courseList.length>0 ? courseList.map((course, index) => (
                <CourseCard key={index} course={course} />
            )):
            [0,1,2,3].map((item,index) => (
                <Skeleton key={index} className={'w-full h-[240px]'} />
            ))}
        </div>
    </div>
  )
}

export default ExploreCourses