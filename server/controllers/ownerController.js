const Member = require("../models/member.js");
const Owner = require("../models/owner.js");
const { hashPassword } = require("../helpers/auth.js");

// Create a member by owner
const createMemberByOwner = async (req, res) => {
  const owner = req.user;

  if (owner.role !== "owner") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { username, email, password, fonction } = req.body;
  if (!fonction) {
    return res.status(400).json({ error: "Fonction is required" });
  }

  try {
    // Check if username or email already exist
    const existingMember = await Member.findOne({
      $or: [{ username }, { email }],
    });
    if (existingMember) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newMember = await Member.create({
      username,
      email,
      password: hashedPassword,
      role: "member",
      fonction,
      owner: owner.id, // Assign the owner's ID to the new member
    });

    // Ensure owner is a Mongoose document before updating and saving
    const ownerDoc = await Owner.findById(owner.id);
    if (!ownerDoc) {
      return res.status(404).json({ error: "Owner not found" });
    }

    // Update owner's members field to include the new member's ID
    ownerDoc.members.push(newMember._id);
    await ownerDoc.save();

    return res.status(201).json(newMember);
  } catch (error) {
    console.error("Error creating member by owner", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update a member by owner
const updateMemberByOwner = async (req, res) => {
  const owner = req.user;
  if (owner.role !== "owner") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { userId } = req.params;
  const { username, email, fonction } = req.body;

  if (!fonction) {
    return res.status(400).json({ error: "Fonction is required" });
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { username, email, fonction },
      { new: true }
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member by owner", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a member by owner
const deleteMemberByOwner = async (req, res) => {
  const owner = req.user;
  if (owner.role !== "owner") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { userId } = req.params;

  try {
    await Member.findByIdAndDelete(userId);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Error deleting member by owner", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// List all members by owner
const listMembersByOwner = async (req, res) => {
  const owner = req.user;
  if (owner.role !== "owner") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const members = await Member.find({ owner: owner.id });
    res.status(200).json(members);
  } catch (error) {
    console.error("Error listing members by owner", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a member by ID
const getMemberById = async (req, res) => {
  const owner = req.user;
  if (owner.role !== "owner") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { memberId } = req.params;

  try {
    const member = await Member.findOne({ _id: memberId, owner: owner.id });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json(member);
  } catch (error) {
    console.error("Error getting member by ID", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createMemberByOwner,
  updateMemberByOwner,
  deleteMemberByOwner,
  listMembersByOwner,
  getMemberById,
};
