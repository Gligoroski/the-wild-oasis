import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error(`Cabins could not be loaded`);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be deleted`);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://mjbjyduebrhkbmzhdkon.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    `/`,
    ``,
  );

  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("Cabins");
  // create and edit cabin

  // create new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imageUrl }]);
  }
  if (id) {
    // edit existing cabin
    query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be ${id ? `edited` : `created`}`);
  }

  if (hasImagePath) return data;
  // Upload image to storage

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      `Cabin image could not be uploaded  and therefore cabin not created`,
    );
  }

  return data;
}
