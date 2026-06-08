import LostItem from "../models/lostItem.model.js";

// create lost item
export const createLostItem = async (req, res) => {
  try {
    const { title, category, description, location, reward } = req.body;

    // req.files comes from upload.array("images") middleware
    const images = req.files?.map((file) => file.path) || [];

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

// get lost item by id
export const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id).populate(
      "owner",
      "_id name email"
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete item
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

// get all lost items with filters
export const getLostItems = async (req, res) => {
  try {
    const {
      search,
      category,
      location,
      status,
      time,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    let query = {
  status: "lost",
};  
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (time === "today") {
      query.createdAt = {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      };
    }

    if (time === "week") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      query.createdAt = { $gte: d };
    }

    if (time === "month") {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      query.createdAt = { $gte: d };
    }

    let sortOption = {};
    if (sort === "newest") sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };

    const items = await LostItem.find(query)
      .populate("owner", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await LostItem.countDocuments(query);

    res.status(200).json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};