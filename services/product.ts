import { HTTPError } from 'ky';
import { http } from '~/libs/ky';
import { CreateProductResponse, GetProductResponse } from '~/types/product/product';
import { CategoryProps } from '~/components/product-list/types';

const createProduct = async (payload: any, orgId: string): Promise<CreateProductResponse> => {
  try {
    const response = await http
      .post(`organisations/${orgId}/products`, {
        json: { ...payload },
      })
      .json<CreateProductResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    console.log(error);

    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<CreateProductResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

const fetchProducts = async (orgId: string | undefined): Promise<CategoryProps[]> => {
  try {
    const response = await http.get(`organisations/${orgId}/products`).json<GetProductResponse>();
    if ('error' in response) {
      throw new Error('Something went wrong');
    }
    const data = response.data;
    let sortedArray: Array<CategoryProps> = [];
    data.forEach((product) => {
      let existingCategory = sortedArray.find(
        (category) => category.name.toLowerCase() == product.category.toLowerCase()
      );
      if (!existingCategory) {
        sortedArray.push({ name: product.category, products: [product] });
      } else {
        sortedArray = sortedArray.map((category) => {
          if (category.name.toLowerCase() == product.category.toLowerCase()) {
            return { name: category.name, products: [...category.products, product] };
          }
          return category;
        });
      }
    });
    return sortedArray;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<CreateProductResponse>();
      throw new Error(errorBody.message || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};

export const ProductService = {
  createProduct,
  fetchProducts,
};
