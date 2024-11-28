'use client';

import { useEffect } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const carouselImages = [
  {
    id: '1',
    imgUrl: 'https://www.gamevicio.com/static/imagens_up/big/114/microsoft-flight-simulator-2024-tem-requisitos-de-sistema-divulgados-exigindo-ate-64-gb-de-ram-113998.webp',
  },
  {
    id: '2',
    imgUrl: 'https://www.gamevicio.com/static/imagens_up/big/117/need-for-speed-unbound-apresenta-o-vol-9-com-muitas-novidades-116556.webp',
  },
  {
    id: '3',
    imgUrl: 'https://www.gamevicio.com/static/imagens_up/big/72/alan-wake-ii-ganha-novas-artes-conceituais-e-informacoes-oficiais-071886.jpg',
  },
  {
    id: '4',
    imgUrl: 'https://www.gamevicio.com/static/imagens_up/big/74/the-last-of-us-part-i-foi-reconstruido-do-zero-para-o-playstation-5-073516.jpg',
  },
];

const Hero = () => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true, // Ativa o loop
      autoplay: {
        delay: 7000, // Tempo entre os slides em milissegundos (opcional)
        disableOnInteraction: false, // Continua o autoplay após interação do usuário
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }, []); // Executa somente no cliente

  return (
    <div className="swiper mt-16 ">
      <div className="swiper-wrapper">
        {carouselImages.map((image) => (
          <div className="swiper-slide" key={image.id}>
            <Image
              src={image.imgUrl}
              alt={`Slide ${image.id}`}
              width={1920} // Largura da imagem (ajuste conforme necessário)
              height={1080} // Altura da imagem (ajuste conforme necessário)
              className="sm:object-contai object-cover  w-full h-[400px]" // Estilização opcional
              priority={image.id === '1'} // Prioriza o carregamento do primeiro slide
            />
          </div>
        ))}
      </div>

      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default Hero;
