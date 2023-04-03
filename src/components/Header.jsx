export default function Header() {
  return (
    <div className='bg-[#16ABF8] flex items-center justify-center'>
      <header
        data-cy='header-background'
        className='layout flex items-center h-[105px] md:h-24 max w-[80%]'
      >
        <h1 data-cy='header-title' className='text-white text-2xl  font-bold'>
          TO DO LIST APP
        </h1>
      </header>
    </div>
  );
}
