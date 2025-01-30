import UserProfiles from "../models/userProfile.model.js";

export const addUserProfileDB = async (
  userId,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl
) => {
  // console.log(role);
  try {
    const userEntry = await UserProfiles.create({
      userId,
      bio,
      linkedInUrl,
      facebookUrl,
      instaUrl,
    });
    return userEntry;
  } catch (error) {
    console.log("Error occured in adding new user in table ", error);
  }
};

export const getUsersProfileDB = async (id) => {
  try {
    let users;
    console.log(id);

    if (id === undefined) {
      users = await UserProfiles.findAll();
      return users;
    } else {
      users = await UserProfiles.findByPk(id);
      return users;
    }
  } catch (error) {
    console.log("Error occured in fetching user from table ", error);
  }
};

export const updateUserProfileDB = async (body, id) => {
  try {
    let newData = {};

    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined) {
        newData[key] = value;
      }
    });

    let [updatedDetails] = await UserProfiles.update(newData, {
      where: { id },
    });

    return updatedDetails, await getUsersProfileDB(id);
  } catch (error) {
    console.log("Error occured in updating user in table ", error);
  }
};
