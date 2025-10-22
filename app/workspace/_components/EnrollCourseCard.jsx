import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function EnrollCourseCard({ course, enrollCourse }) {
    const courseJson = course?.courseJson?.course;
    console.log(course?.courseContent?.length);
    console.log(enrollCourse?.completedChapters?.length);
    const CalculatePerProgress = () => {
        const completedChapter = enrollCourse?.completedChapters?.length ?? 0;
        const totalChapter = course?.courseContent?.length;
        return Math.ceil((completedChapter / totalChapter)*100);
    }
  return (
    <div className='shadow rounded-xl'>
        {/* <Image src={course?.bannerImageUrl} alt={course?.name} 
        width={400} 
        height={300} 
        className='w-full h-[250px] rounded-xl object-cover'/> */}
        <div className='p-3 flex flex-col gap-3'>
            <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
            <p className='line-clamp-3 text-gray-400 text-sm '>{courseJson?.description}</p>
            <div className=''>
                <h2 className='flex justify-between text-primary'>Progress <span>{CalculatePerProgress()}%</span></h2>
                <Progress value={CalculatePerProgress()} />
                <Link href={'/workspace/view-course/' + course?.cid}>
                <Button className={'w-full mt-3'}><PlayCircle /> Continue Learning</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default EnrollCourseCard