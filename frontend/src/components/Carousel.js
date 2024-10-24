import { useState } from 'react';

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const ImageModal = ({ imageUrl, closeModal }) => {
        return (
            <div
                className="fixed top-0 left-0 w-full h-full overflow-y-scroll bg-black bg-opacity-75 flex justify-center items-center z-50"
                onClick={closeModal}
            >
                <div className="relative max-w-8xl flex justify-center items-center  max-h-screen  w-full h-full">
                    <button
                        className="absolute top-4 right-4 bg-gray-300 rounded-full p-3 text-xl"
                        onClick={closeModal}
                    >
                        ✖
                    </button>
                    <img
                        src={imageUrl}
                        alt="Large view"
                        className="w-full h-auto max-h-screen object-contain"
                    />
                </div>
            </div>
        );
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto pt-4">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="min-w-full flex items-center justify-center">
                            <img onClick={() => handleImageClick(item)} src={item.url} alt={item.public_id} className="w-auto h-[400px] object-fill hover:cursor-pointer  rounded-lg" />


                        </div>



                    ))}
                </div>

                {isModalOpen && <ImageModal imageUrl={selectedImage} closeModal={closeModal} />}
            </div>
            {/* Previous Button */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 focus:outline-none"
            >
                &#10094;
            </button>
            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 focus:outline-none"
            >
                &#10095;
            </button>
            {/* Indicator Dots */}
            <div className="flex justify-center mt-4 space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-indigo-600' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;