"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import addRecipeAction from "@/lib/actions/addRecipe";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AddRecipeFormSchema, {
  AddRecipeFormSchemaType,
  AddRecipeFormSchemaInputType,
} from "@/lib/zod/schemas/addRecipeForm";
import { Checkbox } from "@/components/ui/checkbox";
import FormCheckboxContainer from "@/components/FormCheckboxContainer";
import { useFormStatus } from "react-dom";
import FormSubmitBtn from "@/components/FormSubmitBtn";
import { useState } from "react";

export default function AddRecipeFormContent() {
  const [isSending, setIsSending] = useState(false);
  const form = useForm<
    AddRecipeFormSchemaInputType,
    any,
    AddRecipeFormSchemaType
  >({
    resolver: zodResolver(AddRecipeFormSchema),
    defaultValues: {
      description: "",
      isVegan: false,
      timeToCookMins: "",
      title: "",
    },
  });
  const { handleSubmit, control } = form;

  async function onSubmit(data: AddRecipeFormSchemaType) {
    setIsSending(true);
    await addRecipeAction(data);
    setIsSending(false);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* time to cook */}
        <FormField
          control={control}
          name="timeToCookMins"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time to cook (in minutes)</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isVegan */}
        <FormField
          control={control}
          name="isVegan"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex gap-1 items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Vegan</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormSubmitBtn isLoading={isSending}>Create</FormSubmitBtn>
      </form>
    </FormProvider>
  );
}
