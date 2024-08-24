import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { ProductService } from '~/services/product';
import { useRouter } from 'expo-router';

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: onDelete, isPending: isDeleting } = useMutation({
    mutationFn: (productId: string) => ProductService.deleteProduct(productId),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        props: {
          title: 'Success',
          description: 'Product deleted successfully',
        },
      });

      queryClient.invalidateQueries({ queryKey: ['product'] });
      router.back();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        Toast.show({
          type: 'error',
          props: {
            title: 'Error',
            description: error.message,
          },
        });
      }
    },
  });

  return { onDelete, isDeleting };
};

export { useDeleteProduct };
