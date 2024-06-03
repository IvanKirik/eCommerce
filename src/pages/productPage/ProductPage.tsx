import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imghumidity from '../../assets/images/humidity.png';
import imglightning from '../../assets/images/lightning.png';
import imgtemperature from '../../assets/images/temperature.png';
import Button from '../../components/button/Button';
import SliderSimple from '../../components/slider/Slider';
import { ProductDto } from '../../mappers/dto/product.dto';
import { productMapper } from '../../mappers/product.mapper';
import { productsService } from '../../services';
import styles from './product.module.scss';

const descriptionProduct = [
  {
    name: 'lightning',
    title: 'Освещение',
    src: imglightning,
  },
  {
    name: 'humidity',
    title: 'Влажность',
    src: imghumidity,
  },
  {
    name: 'temperature',
    title: 'Температура',
    src: imgtemperature,
  },
];

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const getData = async (id: string) => {
    try {
      const { statusCode, body } = await productsService.getByID(id);
      if (statusCode === 200) {
        return productMapper.fromDto(body.masterData.staged);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [product, setProduct] = useState<ProductDto>();

  useEffect(() => {
    const fetchData = async () => {
      const product = await getData(id!);
      setProduct(product);
    };
    fetchData();
  }, [id]);

  return product ? (
    <div className={styles.main__wrapper}>
      <h2>{product.name}</h2>
      <div className={styles.product__content}>
        {product.images.length > 0 ? (
          <div className={styles.product__carusel}>
            <SliderSimple images={product.images} />
          </div>
        ) : (
          ''
        )}
        <div className={styles.product__description}>
          {descriptionProduct.map((val) => {
            return product[val.name] ? (
              <div className={styles.product__option} key={val.name}>
                <div className={styles.option__img}>
                  <img src={val.src} />
                </div>
                <div>
                  <h3>{val.title}</h3>
                  <p className={styles.option__description}>
                    {product[val.name] as string}
                  </p>
                </div>
              </div>
            ) : (
              ''
            );
          })}
          <div className={styles.description__bottom}>
            <div className={styles.bottom__left}>
              {product.height ? (
                <p className={styles.product__size}>
                  Высота:{' '}
                  <span className={styles.size__value}>
                    {product.height} см
                  </span>
                </p>
              ) : (
                ''
              )}
              {product.diameter ? (
                <p className={styles.product__size}>
                  Диаметр (горшка):{' '}
                  <span className={styles.size__value}>
                    {product.diameter} см
                  </span>
                </p>
              ) : (
                ''
              )}
            </div>
            {product.price.centAmount ? (
              <div
                className={styles.price}
              >{`${product.price.centAmount} ${product.price.currency}`}</div>
            ) : (
              ''
            )}
          </div>
          <div className={styles.buttons}>
            <Button className={styles.btn}>В избранное</Button>
            <Button className={styles.btn}>В корзину</Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main__wrapper}>Описание продукта отсутсвует</div>
  );
};

export default ProductPage;
