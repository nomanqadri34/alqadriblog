import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl font-semibold'>
                Need a Stunning Website for Your Business?
            </h2>
            <p className='text-gray-500 my-2'>
                Let's craft a sleek, high-performing website that sets you apart!
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 via-purple-600 to-rose-500 text-white rounded-xl px-5 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
    <a href="https://www.alqadridev.in" target="_blank" rel="noopener noreferrer">
        View My Portfolio
    </a>
</Button>



        </div>
        <div className="p-7 flex-1">
            <img 
                src="/src/images/p1.jpg" 
                alt="Freelancing Portfolio"
                className="rounded-lg shadow-lg"
            />
        </div>
    </div>
  );
}
