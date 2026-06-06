import FoundItem from "../models/foundItem.model.js";

//create a found item

export const createFoundItem = async (req, res) => {
  try {
    const { title, category, description, location, images } = req.body;

    const item = await FoundItem.create({
      finder: req.user._id,
      title,
      category,
      description,
      location,
      images,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get all found item

export const getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find()
      .populate("finder", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get a found item by id

export const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate(
      "finder",
      "name email"
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//delete a found item

export const deleteFoundItem = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.finder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};