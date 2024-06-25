const Type = require('../../model/admin/types')

// get listed types page

exports.getListedTypes = async (req, res) => {
    try {
        const admin = req.session.adminName
        const types = await Type.find({ isListed: true })
        res.render('listedTypes', { admin: admin, types: types })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }
}

// get  unlisted types page

exports.getUnListedTypes = async (req, res) => {
    try {
        const admin = req.session.adminName
        const types = await Type.find({ isListed: false })
        res.render('unlistedTypes', { admin: admin, types: types })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }
}

// add a type 

exports.addTypes = async (req, res) => {
    try {
        const typ = req.body.type;

        const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;

        // Name Validation
        if (!namePattern.test(typ.trim())) {
            return res.status(401).json({ msg: 'Enter only alphabets', type: 'error' });
        }

        const istype = await Type.findOne({ type_name: { $regex: new RegExp('^' + typ + '$', 'i') } });
        if (istype) {
            return res.status(401).json({ msg: 'This type already exists', type: 'error' });
        }

        const type = new Type({ type_name: typ })
        await type.save()

        const types = await Type.find({ isListed: true })

        res.status(200).json({ msg: 'Successfully Added', type: 'success', types: types })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }

}

// edit a type

exports.editTypes = async (req, res) => {
    try {
        const { type: typ, id } = req.body;

        const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;

        const type = await Type.findById(id)

        // Name Validation
        if (!namePattern.test(typ.trim())) {
            return res.status(401).json({ msg: 'Enter only alphabets', type: 'error', text: type.type_name });
        }

        const types = await Type.find({ $and: [{ _id: { $ne: id } }, { type_name: { $regex: new RegExp('^' + typ + '$', 'i') } }] })
        if (types.length > 0) {
            return res.status(401).json({ msg: 'This type already exists', type: 'error' });
        }

        type.type_name = typ;
        await type.save()

        res.status(200).json({ msg: 'Successfully Edited', type: 'success', text: typ })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }

}

// unlist type

exports.unlistType = async (req, res) => {

    try {
        const id = req.body.id
        const type = await Type.findById(id)
        type.isListed = false
        await type.save()

        const types = await Type.find({ isListed: true })

        res.status(200).json({ msg: 'Successfully Unlisted', type: 'success', types: types })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }

}

// list type

exports.listType = async (req, res) => {

    try {
        const id = req.body.id
        const type = await Type.findById(id)
        type.isListed = true
        await type.save()

        const types = await Type.find({ isListed: false })

        res.status(200).json({ msg: 'Successfully Listed', type: 'success', types: types })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msg: 'Internal server error', type: 'error' })
    }
}
