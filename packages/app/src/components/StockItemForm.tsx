import { useAddItemOverlay } from '#hooks/useAddItemOverlay'
import {
  Button,
  ButtonCard,
  HookedForm,
  HookedInput,
  HookedValidationApiError,
  HookedValidationError,
  Section,
  Spacer,
  Text
} from '@commercelayer/app-elements'
import type { Sku, StockItem } from '@commercelayer/sdk'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { z } from 'zod'
import { ListItemSku } from './ListItemSku'

const stockItemFormSchema = z.object({
  id: z.string().optional(),
  item: z.string().min(1),
  quantity: z.string().min(1)
})

export type StockItemFormValues = z.infer<typeof stockItemFormSchema>

interface Props {
  resource?: StockItem
  defaultValues?: Partial<StockItemFormValues>
  isSubmitting: boolean
  onSubmit: (
    formValues: StockItemFormValues,
    setError: UseFormSetError<StockItemFormValues>
  ) => void
  apiError?: any
}

export function StockItemForm({
  resource,
  defaultValues,
  onSubmit,
  apiError,
  isSubmitting
}: Props): JSX.Element {
  const stockItemFormMethods = useForm<StockItemFormValues>({
    defaultValues,
    resolver: zodResolver(stockItemFormSchema)
  })

  const { show: showAddItemOverlay, Overlay: AddItemOverlay } =
    useAddItemOverlay()

  const [selectedItemResource, setSelectedItemResource] = useState<Sku>()
  const sku = resource?.sku != null ? resource?.sku : selectedItemResource
  const stockItemFormWatchedItem = stockItemFormMethods.watch('item')

  return (
    <>
      <HookedForm
        {...stockItemFormMethods}
        onSubmit={(formValues) => {
          onSubmit(formValues, stockItemFormMethods.setError)
        }}
      >
        <Section>
          <Spacer top='6' bottom='4'>
            <Text weight='semibold'>Item</Text>
            <Spacer top='2'>
              {stockItemFormWatchedItem == null ? (
                <ButtonCard
                  iconLabel='Add item'
                  padding='4'
                  fullWidth
                  onClick={() => {
                    showAddItemOverlay('skus')
                  }}
                />
              ) : (
                <ListItemSku
                  resource={sku}
                  disabled={defaultValues?.id != null}
                  variant='card'
                  onSelect={() => {
                    if (defaultValues?.id == null) {
                      showAddItemOverlay('skus')
                    }
                  }}
                />
              )}
              <Spacer top='2'>
                <HookedValidationError name='item' />
              </Spacer>
              <AddItemOverlay
                onConfirm={(resource) => {
                  setSelectedItemResource(resource)
                  stockItemFormMethods.setValue('item', resource.id)
                }}
              />
            </Spacer>
          </Spacer>
          <Spacer top='6' bottom='4'>
            <HookedInput
              name='quantity'
              label='Quantity'
              type='number'
              min='1'
            />
          </Spacer>
        </Section>
        <Spacer top='14'>
          <Button type='submit' disabled={isSubmitting} className='w-full'>
            {defaultValues?.id == null ? 'Create' : 'Update'}
          </Button>
          <Spacer top='2'>
            <HookedValidationApiError apiError={apiError} />
          </Spacer>
        </Spacer>
      </HookedForm>
    </>
  )
}
