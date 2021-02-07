import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import CardHeader from "../components/CardHeader";
import { Scene } from "../definitions";
import { setChoosingMedia } from "../store/slices/app";
import { setPreviewMediaList } from "../store/slices/preview";
import { useScenesWithChildren } from "./useScenesWithChildren";

const useValidation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const scenes = useScenesWithChildren();
  const validatePreDelete = (id: string) => {
    if (scenes.length === 1) {
      enqueueSnackbar("The last scene cannot be deleted.", {
        variant: "error",
      });
      return false;
    } else if (scenes.find((x) => x.id === id)?.clientsList?.length) {
      enqueueSnackbar(
        "Scene cannot be deleted while some devices are using it.",
        { variant: "error" }
      );
      return false;
    }
    return true;
  };
  const validatePrePreview = (mediaList: string[]) => {
    if (mediaList.length < 1) {
      enqueueSnackbar("Cannot preview scene without any media", {
        variant: "error",
      });
      return false;
    }
    return true;
  };
  return { validatePreDelete, validatePrePreview };
};

interface Props {
  scene: Scene;
}

const SceneHeader: React.FC<Props> = ({ scene }) => {
  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { validatePreDelete, validatePrePreview } = useValidation();
  const handleAddClick = (id: string) => dispatch(setChoosingMedia(id));
  const handleNameChange = async (id: string, name: string) => {
    await firestore.update({ collection: "scenes", doc: id }, { name });
    enqueueSnackbar("Scene name updated", { variant: "success" });
  };
  const handlePreviewClick = (mediaList: string[]) => {
    if (validatePrePreview(mediaList)) {
      dispatch(setPreviewMediaList({ mediaList, type: "modal" }));
    }
  };
  const handleDeleteClick = async (id: string) => {
    if (validatePreDelete(id)) {
      await firestore.delete({ collection: "scenes", doc: id });
      enqueueSnackbar("Scene deleted successfully", { variant: "success" });
    }
  };
  return (
    <CardHeader
      title={scene.name}
      actions={[
        {
          icon: "add",
          tooltip: "Add media to this scene",
          onClick: () => handleAddClick(scene.id),
        },
        {
          icon: "visibility",
          tooltip: "Preview this scene",
          onClick: () => handlePreviewClick(scene.mediaList.map((x) => x.id)),
        },
        {
          icon: "delete",
          tooltip: "Delete this scene",
          onClick: () => handleDeleteClick(scene.id),
        },
      ]}
      onChangeTitle={(name: string) => handleNameChange(scene.id, name)}
    />
  );
};

export default SceneHeader;
