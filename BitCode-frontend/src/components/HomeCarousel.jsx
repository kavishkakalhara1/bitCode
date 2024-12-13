import { Carousel } from "flowbite-react";

export function HomeCarousel() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel indicators={false} className="md:h-96">
          
          <img
            src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/442407310_881026487371007_1322880136030672657_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=r20HTHOMTM8Q7kNvgEm9Ev1&_nc_ht=scontent-hkg4-1.xx&oh=00_AYDmt39Kmw2rZJX9hwCuHuIAZPg9Jo6ks5RCBkxN2VAXdg&oe=66612564"
            alt="..."
            width={1000}
            height={500}
          />

        <img
          src="https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/434112196_842269127913410_2431040904925507212_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=5AZjbmnSTQQQ7kNvgFCNpF7&_nc_ht=scontent-hkg1-2.xx&oh=00_AYDnvvxXptJ8-d9sOtEj2202NpwN2upIpqzLMJk2r45vGg&oe=665E531D"
          alt="..."
          width={1000}
          height={500}
        />
        <img
          src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/434145778_842269144580075_98476745693095129_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Wk3kzOUiGTAQ7kNvgG7m4Jn&_nc_ht=scontent-hkg1-1.xx&oh=00_AYBNKP9DH_XIo9anlelrzQAZRovPhN-6fmR510Hrqwlvkg&oe=665E281F"
          alt="..."
          width={1000}
          height={500}
        />
        <img
          src="https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-6/434125464_842283231245333_3217443948993295895_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R1HpdozJn-sQ7kNvgEJ5AdL&_nc_ht=scontent-hkg1-2.xx&oh=00_AYD9hUZ5GxsV8k-bY9_TXoFNAA0dD9_aO07MN_6cVlshRw&oe=665E28CA"
          alt="..."
          width={1000}
          height={500}
        />
        <img
          src="https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/434229925_842282077912115_4008033642565253330_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=aa96mP6hW1gQ7kNvgHoclkl&_nc_ht=scontent-hkg4-1.xx&oh=00_AYCMAh99TTTYKWa9Wr3MkdCEUlLMl4JBET1H-cTwWrDFwA&oe=665E2337"
          alt="..."
          width={1000}
          height={500}
        />
      </Carousel>
    </div>
  );
}
