import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

function Produk() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const data = res.data;
      const pcParts = data.map((item, index) => ({
        ...item,
        title: pcPartNames[index] || item.title,
        description: pcPartDescriptions[index] || item.description,
        image: pcPartImages[index] || item.image,
      }));
      setProducts(pcParts);
    });
  }, []);

  return (
    <div className="produk-container">
      <h2 className="produk-heading">Daftar Produk</h2>
      <div className="produk-grid">
        {products.map((product) => (
          <div className="produk-card" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="produk-img"
            />
            <h3 className="produk-title">{product.title}</h3>
            <p className="produk-desc">{product.description}</p>
            <p className="produk-price">
              Rp {(product.price * 16000).toLocaleString()}
            </p>
            <button onClick={() => addToCart(product)}>
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produk;

// Data tambahan untuk ubah nama, gambar, deskripsi
const pcPartNames = [
  "AMD Ryzen 5 5600X",
  "Intel Core i5-12400F",
  "ASUS ROG Strix B550-F",
  "MSI B660M Mortar",
  "Corsair Vengeance 16GB DDR4",
  "Kingston Fury Beast 16GB DDR5",
  "Samsung 970 EVO Plus 1TB",
  "WD Blue 2TB HDD",
  "Gigabyte RTX 3060 12GB",
  "ASUS TUF RX 6700 XT",
  "Cooler Master Hyper 212",
  "NZXT Kraken X63",
  "Corsair RM750x PSU",
  "Seasonic Focus GX-650",
  "NZXT H510 Case",
  "Lian Li PC-O11 Dynamic",
  "Logitech G Pro X Keyboard",
  "Razer DeathAdder V2 Mouse",
  "SteelSeries Arctis 7 Headset",
  "BenQ ZOWIE XL2411K Monitor",
];

const pcPartDescriptions = [
  "Prosesor 6-core 12-thread ideal untuk gaming dan multitasking.",
  "Prosesor hemat daya dengan performa tinggi untuk PC mid-range.",
  "Motherboard ATX premium dengan WiFi dan RGB lighting.",
  "Motherboard micro-ATX tangguh untuk Intel Gen 12.",
  "RAM 3200MHz dengan heatsink, cocok untuk gaming.",
  "DDR5 RAM performa tinggi untuk build masa depan.",
  "SSD NVMe cepat dengan kecepatan baca hingga 3500MB/s.",
  "Penyimpanan besar dan handal untuk data dan game.",
  "GPU mid-range ideal untuk 1080p dan 1440p gaming.",
  "Kartu grafis kuat untuk gaming 1440p dan editing.",
  "Pendingin udara dengan 4 heatpipe dan kipas 120mm.",
  "Watercooling AIO 280mm dengan RGB dan software control.",
  "PSU modular 80+ Gold untuk efisiensi maksimal.",
  "PSU tenang dan efisien, cocok untuk build profesional.",
  "Casing minimalis dengan manajemen kabel yang baik.",
  "Casing mewah dengan panel kaca dan airflow baik.",
  "Keyboard mekanikal hot-swappable dengan RGB.",
  "Mouse ergonomis dan akurat untuk FPS.",
  "Headset wireless dengan surround sound dan mic jernih.",
  "Monitor 144Hz untuk gaming kompetitif.",
];

const pcPartImages = [
  "https://down-id.img.susercontent.com/file/id-11134207-7r991-lsjq4fdw0v9i1a", // Ryzen
  "https://www.batamonlineshop.com/magento2/pub/media/catalog/product/cache/1bc6a49f97ee0d4bc0dd855587c538a3/i/n/intel-core-i5-alder-lake-processor-01_1.jpg", // Intel
  "https://dlcdnwebimgs.asus.com/gain/803CCAEB-848C-416A-A24C-B107B9575134", // ASUS B550
  "https://asset.msi.com/resize/image/global/product/product_16412879181907910da1823dc3ff897d691e2f55b9.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png", // MSI B660
  "https://ae01.alicdn.com/kf/A912ac018e26146debe0c39e3fa2a68f3W.jpg", // Corsair RAM
  "https://media.kingston.com/kingston/product/FURY_Beast_Black_RGB_DDR5_1-sm.jpg", // Kingston DDR5
  "https://els.id/wp-content/uploads/2024/12/SSD-m.2-NVMe-1TB-Samsung-EVO-970-Plus-3.png", // SSD
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9LJASOrJoNGbRwJaRrwqpgzx1gClYr_Jsw&s", // HDD
  "https://www.gigabyte.com/FileUpload/Global/KeyFeature/1680/innergigabyteimages/kf-img.png", // RTX 3060
  "https://i0.wp.com/www.amd-id.com/wp-content/uploads/2021/05/Intro-AMD-Radeon-RX-6700-XT.jpg?resize=696%2C392&ssl=1", // RX 6700 XT
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi9MFLfyR7S5MtF56V6Fv0yRWiRhlYU3lJyw&s", // Air cooler
  "https://blossomzones.com/wp-content/uploads/2021/01/KRAKEN-X63-RGB.png", // Kraken
  "https://assets.corsair.com/image/upload/f_auto,q_auto/content/CP-9020179-NA-RM750x-PSU-01.png", // PSU
  "https://blossomzones.com/wp-content/uploads/2018/01/FX650.jpg", // PSU Seasonic
  "https://www.datocms-assets.com/34299/1617970828-h510-whiteblack-no-system-top-45.png", // NZXT H510
  "https://lian-li.com/wp-content/uploads/2020/11/O11D-black-side.jpg", // Lian Li
  "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-tkl/gallery-2-pro-x-tkl-black-lightspeed-gaming-keyboard.png.png?v=1", // Keyboard
  "https://www.softcom.co.id/wp-content/uploads/2020/11/Mouse-Razer-DeathAdder-V2-1.jpg", // Mouse
  "https://www.softcom.co.id/wp-content/uploads/2020/06/Arctis-7.jpg", // Headset
  "https://image.benq.com/is/image/benqco/XL2731-1-1?$ResponsivePreset$&fmt=png-alpha", // Monitor
];
