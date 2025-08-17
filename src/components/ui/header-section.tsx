import { Separator } from '@/components/ui/separator';

interface IContentSectionProps {
    title: string;
    desc: string;
}

export default function HeaderSection({ title, desc }: IContentSectionProps) {
    return (
        <div className='flex flex-1 flex-col'>
            <div className='flex-none'>
                <h3 className='text-lg font-medium'>{title}</h3>
                <p className='text-muted-foreground text-sm'>{desc}</p>
            </div>
            <Separator className='my-4 flex-none' />
        </div>
    );
}
