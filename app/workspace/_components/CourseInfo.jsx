import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, PlayCircle, Settings, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function CourseInfo({ course, viewCourse }) {
    const courseLayout = course?.courseJson?.course;
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const GenerateCourseContent = async () => {
        // Function to generate course content
        setLoading(true);
        try {
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: course?.name,
                courseId: course?.cid
            });
            console.log(result.data);
            setLoading(false);
            router.replace('/workspace');
            toast.success("Course Content Generated Successfully!");
        } catch(e) {
            console.log(e);
            setLoading(false);
            toast.error("Server Error! Please try again.");
        }
    }
  return (
    <div className='md:flex gap-5 justify-between p-5 rounded-2xl shadow'>
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-3xl'>{courseLayout?.name}</h2>
            <p className='line-clamp-2 text-gray-500'>{courseLayout?.description}</p>
            <div className='grid grid-cols-1 md: grid-cols-3'>
                <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                    <Clock className='text-blue-500' />
                    <section>
                        <h2 className='font-bold'>Duration</h2>
                        <h2>2 Hours</h2>
                    </section>
                </div>
                <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                    <Book className='text-green-500' />
                    <section>
                        <h2 className='font-bold'>Chapters</h2>
                        <h2>3</h2>
                    </section>
                </div>
                <div className='flex gap-5 items-center p-3 rounded-lg shadow'>
                    <TrendingUp className='text-red-500' />
                    <section>
                        <h2 className='font-bold'>Difficulty Level</h2>
                        <h2>{course?.level}</h2>
                    </section>
                </div>
            </div>
            {!viewCourse ?
            <Button className='max-w-sm'><Settings /> Generate Content</Button>:
            <Link href={'/course/'+course?.cid}><Button><PlayCircle /> Continue Learning</Button></Link>}
        </div>
        <Image src='/banner.jpg' alt='Banner Image' 
        width={400} height={400} className='w-full mt-5 md:mt-0 object-cover aspect-auto h-[240px] rounded-2xl' />
    </div>
  )
}

export default CourseInfo