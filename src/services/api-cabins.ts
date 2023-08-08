import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import { Cabin } from "../types";

export interface NewCabin {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: File | string;
}

interface GetCabinsResult {
  data: Cabin[];
  count: number;
}

export async function getCabins({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string };
  sortBy?: { field: string; direction: string };
  page?: number;
}): Promise<GetCabinsResult> {
  let query = supabase.from("cabins").select("*", { count: "exact" });

  // FILTER
  if (filter) {
    if (filter.value === "no-discount") {
      query = query["eq"](filter.field, 0);
    } else if (filter.value === "with-discount") {
      query = query["neq"](filter.field, 0);
    }
  }

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return { data, count };
}

export async function createEditCabin(
  newCabin: NewCabin,
  id?: number
): Promise<Cabin> {
  const hasImagePath =
    typeof newCabin.image === "string"
      ? newCabin.image?.startsWith(supabaseUrl)
      : "";
  const imageName =
    typeof newCabin.image === "string"
      ? `${Math.random()}-${newCabin.image.replace(/\//g, "")}`
      : `${Math.random()}-${newCabin.image.name}`;

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    // @ts-ignore
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = (query as any)
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}