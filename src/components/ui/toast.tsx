    import {useState , useEffect ,useRef} from 'react';
    import * as Toast from '@radix-ui/react-toast';

    interface ToastNotification {
    duration?:number;
    title: string;
    triggerButtonText: string;
    description: string;
    showCloseButton?: boolean;
    closeButtonText?:string;
    }

    const ToastNotification= ({ duration , title, description, triggerButtonText , showCloseButton,  closeButtonText }:ToastNotification) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const handleButtonClick = () => {
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
        setOpen(true);
        }, 100);
    };

    return (
        <Toast.Provider>
        <button className="border border-red-400 p-3 rounded-md inline-flex" onClick={handleButtonClick}>
            {triggerButtonText}
        </button>

        <Toast.Root open={open} onOpenChange={setOpen} duration={duration} className='flex gap-4 border border-black bg-amber-600 p-3 items-center rounded-md w-fit'>
            <div>
                <Toast.Title className='text-lg'>{title}</Toast.Title>
                <Toast.Description className='text-xs text-gray-600' >{description}</Toast.Description>
            </div>
            {showCloseButton && (
            <Toast.Action asChild altText="Close">
                <button className="bg-stone-700 text-white text-center rounded-md px-4 h-fit py-0">{closeButtonText}</button>
            </Toast.Action>
            )}
        </Toast.Root>
        <Toast.Viewport className='fixed top-4 left-1/2'/>
        </Toast.Provider>
    );
    };

    export default ToastNotification;
