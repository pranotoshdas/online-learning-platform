'use client';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard';

function EnrollCourseList() {
    const [enrolledCourseList, setEnrolledCourseList] = useState([]);
    useEffect(() => {
        GetEnrolledCourse();
    }, []);
    const GetEnrolledCourse = async () => {
        const result = await axios.get('/api/enroll-course');
        console.log("Enrolled Course List:", result.data);
        setEnrolledCourseList(result.data);
    }
  return enrolledCourseList?.length>0 && (
    <div className='mt-3'>
        <h2 className='font-bold text-xl'>Continue learning your courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
            {enrolledCourseList?.map((course, index)=>(
                <EnrollCourseCard key={index} course={course?.courses} enrollCourse={course?.enrollCourse} />
            ))}
        </div>
    </div>
  )
}

export default EnrollCourseList