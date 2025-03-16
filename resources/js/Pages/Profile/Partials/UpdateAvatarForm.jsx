import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import border from "@/assets/img/BordureAvatar.png";
import { useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import avatars from "@/assets/img/UserAvatar/index.js";
import { Container } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function UpdateAvatarForm() {
    const user = usePage().props.auth.user;

    // 1) Pas de "initialValues:"
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            image:
                user.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            description: user.description || "",
        });

    const [anchorEl, setAnchorEl] = useState(null);

    // 2) On garde une copie locale si besoin
    const [localData, setLocalData] = useState({
        image: data.image,
        description: data.description,
    });

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleImageClick = (avatar) => {
        setData("image", avatar);

        setLocalData((prev) => ({ ...prev, image: avatar }));
        handleClose();
    };
    const submit = (e) => {
        e.preventDefault();

        patch(
            route("profile.update"),
            {
                image: data.image,
                description: data.description,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setLocalData({ ...data });
                },
            }
        );
    };

    console.log(data.description, data.image);
    console.log(localData.image, localData.description);

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Profil et personnalisation
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Modifiez votre avatar et mettez à jour votre description.
                </p>
            </header>

            <form onSubmit={submit} method="PATCH">
                <div className="flex flex-row mt-8 ">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            backgroundImage: `url(${border})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            height: "420px",
                            width: "360px",
                        }}
                        onClick={handleClick}
                    >
                        {/* On affiche localData.image */}
                        <img
                            src={
                                localData.image ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            alt=""
                            width={275}
                        />
                    </div>
                    <textarea
                        className="border-4 border-[#8A2BE2] max-h-64 ml-5 bg-transparent flex-grow"
                        name="description"
                        id="description"
                        maxlength="250"
                        placeholder="Exprimez votre style..."
                        onChange={(e) => {
                            setData("description", e.target.value);
                            setLocalData({
                                ...localData,
                                description: e.target.value,
                            });
                        }}
                        value={localData.description} // Remplace `defaultValue` par `value`
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Container
                            className="p-5"
                            sx={{ backgroundColor: "#121214" }}
                        >
                            <p className="text-white AudioWideBlue">
                                Choisis ton avatar:
                            </p>
                            <ImageList
                                sx={{
                                    width: 700,
                                    height: 200,
                                    flexWrap: "nowrap",
                                    overflowX: "auto",
                                }}
                                cols={avatars.length}
                                rowHeight={200}
                            >
                                {avatars.map((avatar) => (
                                    <ImageListItem
                                        key={avatar}
                                        className="hover:brightness-150"
                                        onClick={() => handleImageClick(avatar)}
                                    >
                                        <img
                                            className={
                                                data.image === avatar
                                                    ? "brightness-150"
                                                    : "brightness-75"
                                            }
                                            src={avatar}
                                            alt=""
                                            width={150}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Container>
                    </Popover>

                    <button
                        type="submit"
                        disabled={processing}
                        className="buttonLeft AudioWideBlue ml-auto"
                        style={{
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width: "180px",
                        }}
                    >
                        {processing ? "Enregistrement..." : "Enregistrer"}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-5"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 translate-y-5"
                    >
                        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                            Vos modifications sont mis à jour avec succès !
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
