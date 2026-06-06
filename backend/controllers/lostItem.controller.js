import LostItem from "../models/lostItem.model.js";


//create lost item

export const createLostItem = async (req, res) => {
  try {
    const { title, category, description, location, reward, images } = req.body;

    const item = await LostItem.create({
      owner: req.user._id,
      title,
      category,
      description,
      location,
      reward,
      images,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get all item 
export const getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// get lost item by id
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id).populate(
      "owner",
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


//delete item 
export const deleteLostItem = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await item.deleteOne();

    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};