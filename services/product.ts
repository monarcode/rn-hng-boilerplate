import { HTTPError } from 'ky';
import { http } from '~/libs/ky';
import { CreateProductResponse } from '~/types/product/product';

const createProduct = async (payload: any): Promise<CreateProductResponse> => {
  try {
    const response = await http
      .post('products/add-products', {
        json: { ...payload },
      })
      .json<CreateProductResponse>();

    if ('error' in response) {
      throw new Error('Something went wrong');
    }

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json<CreateProductResponse>();
      throw new Error(errorBody.name || `HTTP error ${error.response.status}`);
    }
    throw error;
  }
};
export const ProductService = {
  createProduct,
};
