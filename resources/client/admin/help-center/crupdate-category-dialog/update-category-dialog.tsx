import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {useForm} from 'react-hook-form';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {CreateCategoryPayload} from '@app/admin/help-center/requests/use-create-category';
import {CrupdateCategoryForm} from '@app/admin/help-center/crupdate-category-dialog/crupdate-category-form';
import {useUpdateCategory} from '@app/admin/help-center/requests/use-update-category';
import {Category, Section} from '@app/help-center/categories/category';

interface Props {
  category: Category | Section;
}
export function UpdateCategoryDialog({category}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<CreateCategoryPayload>({
    defaultValues: {
      name: category.name,
      parent_id: category.is_section ? category.parent_id : undefined,
      description: category.description,
      image: category.image,
      visible_to_role: category.visible_to_role,
      managed_by_role: category.managed_by_role,
    },
  });
  const updateCategory = useUpdateCategory(form);

  return (
    <Dialog>
      <DialogHeader>
        {category.is_section ? (
          <Trans message="Update section" />
        ) : (
          <Trans message="Update category" />
        )}
      </DialogHeader>
      <DialogBody>
        <CrupdateCategoryForm
          hideParentId={category.is_section}
          formId={formId}
          form={form}
          onSubmit={values => {
            updateCategory.mutate(
              {...values, id: category.id},
              {
                onSuccess: () => close(),
              },
            );
          }}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          disabled={updateCategory.isPending}
          variant="flat"
          color="primary"
          type="submit"
        >
          <Trans message="Update" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
